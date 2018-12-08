import { createSelector } from 'reselect'

const getOrderBook = ({ orderBook }) => orderBook

export const getOrderBookSelector = createSelector(
  [ getOrderBook ], 
  (orderBook) => orderBook
)