import { List } from 'immutable'

export const normalizeTradesUpdate = (trades, update) => {
  if (update.length === 2) {
    // Returns the current state if there is no new data
    if (!Array.isArray(update[1][0])) return trades
    // Return the current state, because this is the initial load through socket
    return trades
  }
  // Returns the current state if this is not update message of type: 'tu'
  if (update[1] !== 'tu') return trades
  // Add the new trade to the top of the list
  return trades.unshift(List(update[2])).slice(0, process.env.REACT_APP_DISPLAY_ITEMS_MAX)
}
