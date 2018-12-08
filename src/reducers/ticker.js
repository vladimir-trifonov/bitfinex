import { handleActions } from 'redux-actions'
import { tickerFetchedOkAction, emptyTickerAction } from '../actions'
import { List } from 'immutable'

export const ticker = handleActions({
  [tickerFetchedOkAction]: (ticker, { payload }) => List(payload),
  [emptyTickerAction]: () => null
}, null)
