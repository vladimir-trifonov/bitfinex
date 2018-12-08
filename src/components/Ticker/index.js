import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { emptyTickerAction } from '../../actions'
import { getTickerSelector } from '../../selectors'
import { withResourceSync } from '../HOC'
import { parseSymbol } from '../../utils'
import Table from 'react-immutable-table'

class Ticker extends PureComponent {
  render () {
    const { ticker, symbol } = this.props
    
    return (
      <Table
        items={ticker}
        title={`Ticker ${parseSymbol(symbol, true)}`}
        count={ticker ? ticker.size : 0}
        theme='dark1'
      />
    )
  }
}

export default withResourceSync(
  connect(
    (state, props) => ({ ticker: getTickerSelector(state, props) })
  )(Ticker),
  { resource: 'ticker', param: 'symbol', onUnsubscribeAction: emptyTickerAction }
)
