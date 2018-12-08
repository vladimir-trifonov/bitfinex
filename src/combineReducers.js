import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { ticker} from './reducers'

export default () => combineReducers({
  routing: routerReducer,
  ticker
})
