import { createAction } from 'redux-actions'

export const FETCH_TICKER_AND_SYNC = 'FETCH_TICKER_AND_SYNC'
export const TICKER_FETCHED_OK = 'TICKER_FETCHED_OK'

export const fetchTickerAndSyncAction = createAction(FETCH_TICKER_AND_SYNC)
export const tickerFetchedOkAction = createAction(TICKER_FETCHED_OK)