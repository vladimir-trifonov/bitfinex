import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchResourceAndSyncAction, stopResourceSyncAction, emptyTickerAction } from '../../actions'
import { getTickerSelector } from '../../selectors'

class Ticker extends PureComponent {
  componentDidMount () {
    const { fetchTickerAndSync, symbol } = this.props
    fetchTickerAndSync(symbol)
  }

  componentWillUnmount () {
    const { stopTickerSync, emptyTicker } = this.props
    stopTickerSync()
    emptyTicker()
  }

  render () {
    const { ticker } = this.props

    console.log(ticker)

    return (
      <div></div>
    )
  }
}

export default connect(
  (state) => ({ ticker: getTickerSelector(state) }),
  (dispatch) => ({ 
    fetchTickerAndSync: (symbol) => dispatch(fetchResourceAndSyncAction({ resource: 'ticker', symbol })),
    stopTickerSync: () => dispatch(stopResourceSyncAction('ticker')),
    emptyTicker: () => dispatch(emptyTickerAction())
  })
)(Ticker)
