import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { emptyTickerAction } from '../../actions'
import { getTickerSelector } from '../../selectors'
import { withResourceSync } from '../HOC'

class Ticker extends PureComponent {
  render () {
    const { ticker } = this.props

    console.log(ticker)

    return (
      <div></div>
    )
  }
}

export default withResourceSync(
  connect(
    (state) => ({ ticker: getTickerSelector(state) })
  )(Ticker),
  { resource: 'ticker', param: 'symbol', onUnsubscribeAction: emptyTickerAction }
)
