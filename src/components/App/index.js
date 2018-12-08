import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { configureStore } from '../../configureStore'
import { Trading } from '../../pages'

const store = configureStore()

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/trading/:symbol" component={Trading} />
            <Redirect exact from="/" to={`/trading/${process.env.REACT_APP_INITIAL_SYMBOL}`} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
