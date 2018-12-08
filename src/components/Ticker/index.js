import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { emptyTickerAction, socketOnOffAction } from '../../actions'
import { getTickerSelector } from '../../selectors'
import { withResource, withSubscription } from '../HOC'
import Table from 'react-immutable-table'

class Ticker extends PureComponent {
  constructor () {
    super()

    this.renderConrols = this.renderConrols.bind(this)
    this.socketOnOff = this.socketOnOff.bind(this)
  }

  socketOnOff (state) {
    return () => {
      this.props.socketOnOff(state)
    }
  }

  renderConrols () {
    return (
      <span>
        WS&nbsp;&nbsp;
        <button onClick={this.socketOnOff({ off: true })}>Off</button>
        <button onClick={this.socketOnOff({ on: true })}>On</button>
      </span>
    )
  }

  render () {
    const { ticker } = this.props
    
    return (
      <Table
        items={ticker}
        count={ticker ? ticker.size : 0}
        renderControls={this.renderConrols}
        theme='dark1'
      />
    )
  }
}

export default withSubscription(
  withResource(
    connect(
      (state, props) => ({ ticker: getTickerSelector(state, props) }),
      (dispatch, state) => ({ 
        socketOnOff: (state) => dispatch(socketOnOffAction(state))
      })
    )(Ticker),
    { resource: 'ticker', param: 'symbol', onUpdateAction: emptyTickerAction }
  ),
  {  
    channel: 'ticker', 
    prop: 'symbol',
    options : { overwrite: true },
    onUnsubscribeAction: emptyTickerAction 
  }
)