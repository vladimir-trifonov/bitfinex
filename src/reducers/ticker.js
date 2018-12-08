import { handleActions } from 'redux-actions'
import { tickerFetchedOkAction } from '../actions'
import { List } from 'immutable'

export const ticker = handleActions({
  [tickerFetchedOkAction]: (ticker, { payload }) => List(payload.map(List))
}, null)
