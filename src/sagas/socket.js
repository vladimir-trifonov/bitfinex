import { eventChannel } from 'redux-saga'
import { take, takeEvery, call, fork, put } from 'redux-saga/effects'
import createSocket from '../socket'
import actions, { SOCKET_SUBSCRIBE, SOCKET_UNSUBSCRIBE } from '../actions'

let socket = createSocket()

function socketInit() {
  return eventChannel(emitter => {
    socket.setEmitter(emitter)
    return () => socket.close()
  })
}

export function* socketInitSaga () {
  const channel = yield call(socketInit)
  while (true) {
    const [resource, data] = yield take(channel)
    yield put(actions[`${resource}UpdateReceivedAction`](data))
  }
}

function* socketSubscribe ({ payload }) {
  if (!socket.ready) yield fork(socketInitSaga)
  yield call(socket.subscribe, payload)
}

export function* socketSubscribeSaga () {
  yield takeEvery(SOCKET_SUBSCRIBE, socketSubscribe)
}

function* socketUnsubscribe ({ payload }) {
  if (!socket.ready) return
  yield call(socket.unsubscribe, payload)
}

export function* socketUnsubscribeSaga () {
  yield takeEvery(SOCKET_UNSUBSCRIBE, socketUnsubscribe)
}
