import { List } from 'immutable'

export const normalizeTickerUpdate = (ticker, update) => {
  // Returns the current state if there is no new data
  if (!Array.isArray(update[1])) return ticker
  // Return the updated ticker
  return List(update[1])
}
