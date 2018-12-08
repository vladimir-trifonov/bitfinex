import { handleActions } from 'redux-actions'
import { orderBookFetchedOkAction, orderBookUpdateReceivedAction, emptyOrderBookAction } from '../actions'
import { normalizeOrderBookUpdate } from '../normalizers'
import { List } from 'immutable'

export const orderBook = handleActions({
  [orderBookFetchedOkAction]: (orderBook, { payload }) => List(payload.slice(0, process.env.REACT_APP_DISPLAY_ITEMS_MAX).map(List)),
  [orderBookUpdateReceivedAction]: (orderBook, { payload }) => normalizeOrderBookUpdate(orderBook, payload),
  [emptyOrderBookAction]: () => null
}, null)
