import { createSelector } from 'reselect'

const getTickers = ({ tickers }) => tickers

export const getTickersSelector = createSelector(
  [ getTickers ], 
  (tickers, filter) => tickers 
)