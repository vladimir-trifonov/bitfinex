import { createAction } from 'redux-actions'

export const orderBookFetchedOkAction = createAction('ORDER_BOOK_FETCHED_OK')
export const orderBookUpdateReceivedAction = createAction('ORDER_BOOK_UPDATE_RECEIVED')
export const emptyOrderBookAction = createAction('EMPTY_ORDER_BOOK')
