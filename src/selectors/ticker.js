import { createSelector } from 'reselect'
import { parseSymbol, getCurrency } from '../utils'
import { List } from 'immutable'

const getTicker = ({ ticker }) => ticker
const getSymbol = (state, { symbol }) => symbol

export const getTickerSelector = createSelector(
  [ getTicker, getSymbol ], 
  (ticker, symbol) => !ticker
    ? ticker
    : List(
        List([ticker])
          .map((ticker) => {
            const vol = parseFloat(ticker.get(7))
            // Returns only the fields, that needs to be displayed

            const result = [
              [
                parseSymbol(symbol, true),
                ticker.get(0)
              ],[
                `VOL ${(vol | 0) === 0 ? vol : (vol | 0)} ${getCurrency(symbol)}`,
                `${ticker.get(4)} (${(ticker.get(5) * 100).toFixed(2)}%)`
              ],[
                `LOW ${ticker.get(9).toFixed(2)}`,
                `HIGH ${ticker.get(8).toFixed(2)}`
              ]
            ]
            return result.map(List)
          })
          .get(0)
    )
)
