import { createSelector } from 'reselect'
import { parseSymbol } from '../utils'
import { List } from 'immutable'

const getTicker = ({ ticker }) => ticker
const getSymbol = (state, { symbol }) => symbol

export const getTickerSelector = createSelector(
  [ getTicker, getSymbol ], 
  (ticker, symbol) => !ticker
    ? ticker
    : List([ticker])
        .map((ticker) => {
          const normalized = ticker
            // Format the 24H amount, which is in percents
            .set(1, `${(ticker.get(1) * 100).toFixed(2)}%`)

          const volInBTC = parseFloat(normalized.get(7))
          // Returns only the fields, that needs to be displayed
          return List.of(
            // Format the symbol
            parseSymbol(symbol, true),
            normalized.get(0), 
            normalized.get(5), 
            `${(volInBTC | 0) === 0 ? volInBTC : (volInBTC | 0)} BTC`
          )
        })
)