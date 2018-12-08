import { handleActions } from 'redux-actions'
import { orderBookUpdateReceivedAction, emptyOrderBookAction } from '../actions'
import { normalizeOrderBookUpdate } from '../normalizers'

export const orderBook = handleActions({
  [orderBookUpdateReceivedAction]: (orderBook, { payload }) => normalizeOrderBookUpdate(orderBook, payload),
  [emptyOrderBookAction]: () => null
}, null)
