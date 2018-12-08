import React, { PureComponent } from 'react'
import { Ticker } from '../../components'

export class Trading extends PureComponent {
  render() {
    const { match: { params: { symbol = null }}} = this.props
    return (
      <main>
        <Ticker symbol={symbol} />
      </main>
    )
  }
}
