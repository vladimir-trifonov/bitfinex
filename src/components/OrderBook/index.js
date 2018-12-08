import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { emptyOrderBookAction } from '../../actions'
import { getOrderBookSelector } from '../../selectors'
import Table from 'react-immutable-table'
import { parseSymbol } from '../../utils'
import { withSubscription } from '../HOC'

class OrderBook extends PureComponent {
  constructor () {
    super()

    this.renderConrols = this.renderConrols.bind(this)
  }

  renderConrols () {
    return (
      <span>
        <button onClick={() => {}}>+</button>
        <button onClick={() => {}}>-</button>
      </span>
    )
  }
  
  render () {
    const { orderBook, symbol } = this.props
    
    return (
      <Table
        items={orderBook}
        title={`OrderBook ${parseSymbol(symbol, true)}`}
        columns={['Price', 'Count', 'Amount']}
        count={orderBook ? orderBook.size : 0}
        renderControls={this.renderConrols}
        theme={'dark1'}
      />
    )
  }
}

export default withSubscription(
  connect(
    (state) => ({ orderBook: getOrderBookSelector(state) })
  )(OrderBook),
  {  
    channel: 'book', 
    prop: 'symbol',
    options : { resource: 'orderBook', overwrite: true },
    onUnsubscribeAction: emptyOrderBookAction 
  }
)