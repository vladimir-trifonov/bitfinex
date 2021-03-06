import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { emptyOrderBookAction } from '../../actions'
import { getOrderBookSelector } from '../../selectors'
import { parseSymbol } from '../../utils'
import { withResource, withSubscription } from '../HOC'
import Table from 'react-immutable-table'


class OrderBook extends PureComponent {
  render () {
    const { orderBook, symbol } = this.props

    return (
      <Table
        items={orderBook}
        title={`OrderBook ${parseSymbol(symbol, true)}`}
        columns={['Price', 'Count', 'Amount']}
        count={orderBook ? orderBook.size : 0}
        theme={'dark1'}
      />
    )
  }
}

export default withSubscription(
  withResource(
    connect(
      (state) => ({ orderBook: getOrderBookSelector(state) })
    )(OrderBook),
    { resource: 'orderBook', param: 'symbol', onUpdateAction: emptyOrderBookAction }
  ),
  {  
    channel: 'book', 
    prop: 'symbol',
    options : { resource: 'orderBook', overwrite: true },
    onUnsubscribeAction: emptyOrderBookAction 
  }
)
