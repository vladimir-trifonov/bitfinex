import { createAction } from 'redux-actions'

export const SOCKET_SUBSCRIBE = 'SOCKET_SUBSCRIBE'
export const SOCKET_UNSUBSCRIBE = 'SOCKET_UNSUBSCRIBE'
export const SOCKET_ON_OFF = 'SOCKET_ON_OFF'

export const socketSubscribeAction = createAction(SOCKET_SUBSCRIBE)
export const socketUnsubscribeAction = createAction(SOCKET_UNSUBSCRIBE)
export const socketOnOffAction = createAction(SOCKET_ON_OFF)