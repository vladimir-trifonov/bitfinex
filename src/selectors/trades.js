import { createSelector } from 'reselect'
import moment from 'moment'

const getTrades = ({ trades }) => trades

export const getTradesSelector = createSelector(
  [ getTrades ], 
  (trades) => !trades
    ? trades
    : trades
      .map((trade) => trade
        // Format the time
        .set(1, moment(trade.get(1)).format('HH:mm:ss'))
        // Do not display the ID
        .remove(0)
      )
)
