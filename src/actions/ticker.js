import { createAction } from 'redux-actions'

export const TICKER_FETCHED_OK = 'TICKER_FETCHED_OK'
export const EMPTY_TICKER = 'EMPTY_TICKER'

export const tickerFetchedOkAction = createAction(TICKER_FETCHED_OK)
export const emptyTickerAction = createAction(EMPTY_TICKER)
