import { createAction } from 'redux-actions'

export const FETCH_TICKERS_AND_SYNC = 'FETCH_TICKERS_AND_SYNC'
export const TICKERS_FETCHED_OK = 'TICKERS_FETCHED_OK'

export const fetchTickersAndSyncAction = createAction(FETCH_TICKERS_AND_SYNC)
export const tickersFetchedOkAction = createAction(TICKERS_FETCHED_OK)