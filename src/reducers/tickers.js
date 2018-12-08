import { handleActions } from 'redux-actions'
import { tickersFetchedOkAction } from '../actions'
import { List } from 'immutable'

export const tickers = handleActions({
  [tickersFetchedOkAction]: (tickers, { payload }) => List(payload.map(List))
}, null)
