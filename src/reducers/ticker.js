import { handleActions } from 'redux-actions'
import { tickerFetchedOkAction, emptyTickerAction, tickerUpdateReceivedAction } from '../actions'
import { normalizeTickerUpdate } from '../normalizers'
import { List } from 'immutable'

export const ticker = handleActions({
  [tickerFetchedOkAction]: (ticker, { payload }) => List(payload),
  [tickerUpdateReceivedAction]: (ticker, { payload }) => normalizeTickerUpdate(ticker, payload),
  [emptyTickerAction]: () => null
}, null)
