import { createAction } from 'redux-actions'

export const tickerFetchedOkAction = createAction('TICKER_FETCHED_OK')
export const tickerUpdateReceivedAction = createAction('TICKER_UPDATE_RECEIVED')
export const emptyTickerAction = createAction('EMPTY_TICKER')
