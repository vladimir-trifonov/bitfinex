import React, { PureComponent } from 'react'
import styles from './Trading.module.css'
import { Ticker, OrderBook } from '../../components'

export class Trading extends PureComponent {
  render() {
    const { match: { params: { symbol = null }}} = this.props
    return (
      <main className={styles.trading}>
        <Ticker symbol={symbol} />
        <OrderBook symbol={symbol} />
      </main>
    )
  }
}
