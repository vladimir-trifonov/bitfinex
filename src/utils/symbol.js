// tETHBTC -> ETH/BTC
export const parseSymbol = (symbol) =>
  `${symbol.slice(1, -3)}/${symbol.slice(-3)}`

// ETH/BTC -> tETHBTC
export const formatSymbol = (pairs) =>
  `${'t'}${pairs.slice(0, -4).toUpperCase()}${pairs.slice(-3).toUpperCase()}`