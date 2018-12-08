import React, { PureComponent, Fragment } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history, configureStore } from '../../configureStore'
import { Trading } from '../../pages'

const store = configureStore()

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Fragment>
            <Route path="/" component={Trading} />
          </Fragment>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
