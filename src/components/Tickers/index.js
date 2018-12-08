import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchTickersAndSyncAction } from '../../actions'
import { getTickersSelector } from '../../selectors'

class Tickers extends PureComponent {
  componentDidMount () {
    const { fetchTickers } = this.props
    fetchTickers()
  }

  render () {
    const { tickers } = this.props

    console.log(tickers)

    return (
      <div></div>
    )
  }
}

export default connect(
  (state) => ({ tickers: getTickersSelector(state) }),
  (dispatch) => ({ 
    fetchTickers: () => dispatch(fetchTickersAndSyncAction('tickers'))
  })
)(Tickers)
