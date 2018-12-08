export default (emitter) => {
  const subscriptions = {}
  let subscribeQueue = []
  let unsubscribeQueue = []
  let emit = null
  const w = new WebSocket(process.env.REACT_APP_BITFINEX_SOCKET_URL)

  const sendMessage = (msg) => w.send(JSON.stringify(msg))

  const removeFromSubscribeQueue = (channel) => {
    subscribeQueue = subscribeQueue.filter(({channel : ch}) => channel !== ch)
  }

  const removeFromUnsubscribeQueue = ({ chanId }) => {
    const index = unsubscribeQueue.indexOf(chanId)
    if (index) unsubscribeQueue.splice(index, 1)
  }

  const subscribeToChannel = ({channel, prop: symbol, options = {}}) => {
    removeFromSubscribeQueue(channel)

    // Unsubscribe from that channel first if we want to overwrite the subscription
    if (options.overwrite && subscriptions[channel]) unsubscribeFromChannelByChannelName({ channel })
    subscriptions[channel] = { channel, symbol, options }
    
    sendMessage({
      event: 'subscribe', 
      channel, 
      symbol
    })
  }

  // Checks if unsubscribe message was already send for that chanId
  // and if so don't send another one, since the server already 
  // knows about our intentions to unsubscribe from that channel 
  const unsubscribeInProgress = (chanId) => unsubscribeQueue.includes(chanId)

  const unsubscribeFromChannelByChannelName = ({ channel }) => {
    if (!subscriptions[channel]) return

    const chanId = subscriptions[channel].chanId
    subscriptions[channel].chanId = null

    if (chanId && !unsubscribeInProgress(chanId)) {
      unsubscribeFromChannelByChanId(chanId)
    }
  }

  const unsubscribeFromChannelByChanId = (chanId) => {
    unsubscribeQueue.push(chanId)
    sendMessage({
      event: 'unsubscribe', 
      chanId: chanId
    })
  }

  const subscribe = ({ channel, prop, options = {} }) => {
    w.readyState === w.OPEN
      ? subscribeToChannel({channel, prop, options })
      // Add to queue, so when the socket connects we can subscribe to the channel
      : subscribeQueue.push({ channel, prop, options }) 
  }

  const onSubscribed = ({ channel, symbol, chanId }) => {
    const subscription = subscriptions[channel]

    if (subscription && subscription.symbol === symbol) {
      subscriptions[channel].chanId = chanId
    } else {
      if (!unsubscribeInProgress(chanId)) {
        unsubscribeFromChannelByChanId(chanId)
      }
    }
  }

  const getChannelByChanId = (chanId) => Object.keys(subscriptions)
    .find((channel) => subscriptions[channel].chanId === chanId)

  const onData = (data) => {
    const [ chanId ] = data
    const channel = getChannelByChanId(chanId)
    
    if (channel) {
      emit && emit([subscriptions[channel].options.resource || channel, data])
    } else {
      if (!unsubscribeInProgress(chanId)) {
        unsubscribeFromChannelByChanId(chanId)
      }
    }
  }

  w.onopen = () => {
    while(subscribeQueue.length) subscribeToChannel(subscribeQueue.shift())
  }

  w.onmessage = (msg) => {
    const data = JSON.parse(msg.data)
    
    if (Array.isArray(data)) onData(data)
    else if(data.event === 'subscribed') onSubscribed(data)
    else if(data.event === 'unsubscribed') removeFromUnsubscribeQueue(data)
  }

  return { 
    subscribe,
    unsubscribe: unsubscribeFromChannelByChannelName,
    setEmitter: (emitter) => emit = emitter,
    close: () => w.close(),
    ready: (emitter) => !!emit
  }
}
