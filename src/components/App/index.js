import React, { PureComponent, Fragment } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { BrowserRouter, Redirect } from 'react-router-dom'
import { configureStore } from '../../configureStore'
import { Trading } from '../../pages'

const store = configureStore()

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Route path="/trading/:symbol" component={Trading} />
            <Redirect exact from="/" to={`/trading/${process.env.REACT_APP_INITIAL_SYMBOL}`} />
          </Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
