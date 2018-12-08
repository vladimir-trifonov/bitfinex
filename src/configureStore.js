import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { initSagas } from './initSagas'
import createRootReducer from './combineReducers'

const __DEV__ = process.env.NODE_ENV === 'development'
export const history = createBrowserHistory()

export function configureStore () {
  const sagaMiddleware = createSagaMiddleware()
  const middleWares = [
    routerMiddleware(history),
    sagaMiddleware
  ]
  
  const composeEnhancers = (__DEV__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
      : compose
  const enhancer = composeEnhancers(applyMiddleware(...middleWares))

  const store = createStore(
    createRootReducer(history),
    enhancer
  )

  initSagas(sagaMiddleware)
  return store
}
