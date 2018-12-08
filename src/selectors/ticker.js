import { createSelector } from 'reselect'

const getTicker = ({ ticker }) => ticker

export const getTickerSelector = createSelector(
  [ getTicker ], 
  (ticker) => ticker
)