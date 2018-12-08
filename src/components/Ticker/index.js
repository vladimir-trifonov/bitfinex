import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchTickerAndSyncAction } from '../../actions'
import { getTickerSelector } from '../../selectors'

class Ticker extends PureComponent {
  componentDidMount () {
    const { fetchTicker } = this.props
    fetchTicker()
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
    fetchTicker: () => dispatch(fetchTickerAndSyncAction('ticker'))
  })
)(Ticker)
