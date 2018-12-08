import { List } from 'immutable'

export const normalizeTradesUpdate = (trades, update) => {
  if (update.length === 2) {
    // Returns the current state if there is no new data
    if (!Array.isArray(update[1][0])) return trades
    // Replace the existing state, because this is the initial load
    return List(update[1].map(List))
  }
  // Returns the current state if this is not update message of type: 'tu'
  if (update[1] !== 'tu') return trades
  // Add the new trade to the top of the list
  return trades.unshift(List(update[2])).slice(0, 30)
}
