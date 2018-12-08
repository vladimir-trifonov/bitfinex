import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { emptyTradesAction } from '../../actions'
import { getTradesSelector } from '../../selectors'
import Table from 'react-immutable-table'
import { parseSymbol } from '../../utils'
import { withResource, withSubscription } from '../HOC'

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
  withResource(
    connect(
      (state) => ({ trades: getTradesSelector(state) })
    )(Trades),
    { resource: 'trades', param: 'symbol', onUpdateAction: emptyTradesAction }
  ),
  {  
    channel: 'trades', 
    prop: 'symbol',
    options : { overwrite: true },
    onUnsubscribeAction: emptyTradesAction 
  }
)
