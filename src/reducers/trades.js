import { handleActions } from 'redux-actions'
import { tradesUpdateReceivedAction, emptyTradesAction } from '../actions'
import { normalizeTradesUpdate } from '../normalizers'

export const trades = handleActions({
  [tradesUpdateReceivedAction]: (trades, { payload }) => normalizeTradesUpdate(trades, payload),
  [emptyTradesAction]: () => null
}, null)
