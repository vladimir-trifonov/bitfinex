// Trading: tETHBTC -> ETH/BTC
// Other: ETHBTC -> ETH/BTC
export const parseSymbol = (symbol, trading) =>
  `${symbol.slice(trading ? 1 : 0, -3)}/${symbol.slice(-3)}`

// Trading: ETH/BTC -> tETHBTC
// Other: ETH/BTC -> ETHBTC
export const formatSymbol = (pairs, trading) =>
  `${trading ? 't' : ''}${pairs.slice(0, -4).toUpperCase()}${pairs.slice(-3).toUpperCase()}`