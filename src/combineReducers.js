import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { ticker, orderBook } from './reducers'

export default () => combineReducers({
  routing: routerReducer,
  ticker,
  orderBook
})
