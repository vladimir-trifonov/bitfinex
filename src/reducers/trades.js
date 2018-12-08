import { handleActions } from 'redux-actions'
import { tradesFetchedOkAction, tradesUpdateReceivedAction, emptyTradesAction } from '../actions'
import { normalizeTradesUpdate } from '../normalizers'
import { List } from 'immutable'

export const trades = handleActions({
  [tradesFetchedOkAction]: (trades, { payload }) => List(payload.slice(0, process.env.REACT_APP_DISPLAY_ITEMS_MAX).map(List)),
  [tradesUpdateReceivedAction]: (trades, { payload }) => normalizeTradesUpdate(trades, payload),
  [emptyTradesAction]: () => null
}, null)
