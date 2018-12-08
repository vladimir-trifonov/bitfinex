import { delay } from 'redux-saga'
import { take, put, fork, cancel } from 'redux-saga/effects'
import actions, { FETCH_RESOURCE_AND_SYNC, STOP_RESOURCE_SYNC } from '../actions'

function* fetchResourceAndSync ({ resource, symbol }) {
  while(true) {
    const response = yield fetch(`${process.env.REACT_APP_BITFINEX_API_URL}${process.env[`REACT_APP_${resource.toUpperCase()}_API_PATH`]}${symbol}`)
    const data = yield response.json()
    yield put(actions[`${resource}FetchedOkAction`](data))
    yield delay(process.env.REACT_APP_API_REFRESH_TIMEOUT)
  }
}

export function* fetchResourceAndSyncSaga () {
  while (true) {
    const { payload: { resource, symbol } } = yield take(FETCH_RESOURCE_AND_SYNC)
    const syncTask = yield fork(fetchResourceAndSync, { resource, symbol })
    let canceled = false
    while (!canceled) {
      const { payload: cancelResource } = yield take(STOP_RESOURCE_SYNC)
      if (resource === cancelResource) {
        yield cancel(syncTask)
        canceled = true
      }
    }
  }
}
