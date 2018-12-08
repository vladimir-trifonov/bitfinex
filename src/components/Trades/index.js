import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { emptyTradesAction } from '../../actions'
import { getTradesSelector } from '../../selectors'
import Table from 'react-immutable-table'
import { parseSymbol } from '../../utils'
import { withSubscription } from '../HOC'

class Trades extends PureComponent {
  render () {
    const { trades, symbol } = this.props

    return (
      <Table
        items={trades}
        title={`Trades ${parseSymbol(symbol, true)}`}
        columns={['Time', 'Amount', 'Price']}
        count={trades ? trades.size : 0}
        theme={'dark1'}
      />
    )
  }
}

export default withSubscription(
  connect(
    (state) => ({ trades: getTradesSelector(state) })
  )(Trades),
  {  
    channel: 'trades', 
    prop: 'symbol',
    options : { overwrite: true },
    onUnsubscribeAction: emptyTradesAction 
  }
)
