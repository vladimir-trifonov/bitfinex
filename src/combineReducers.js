import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { tickers} from './reducers'

export default () => combineReducers({
  routing: routerReducer,
  tickers
})
