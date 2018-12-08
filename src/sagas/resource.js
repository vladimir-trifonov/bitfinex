import { delay } from 'redux-saga'
import { take, put, fork, cancel } from 'redux-saga/effects'
import actions, { FETCH_RESOURCE_AND_SYNC, STOP_RESOURCE_SYNC } from '../actions'

function* fetchResourceAndSync ({ resource, param }) {
  while(true) {
    const response = yield fetch(`${process.env.REACT_APP_BITFINEX_API_URL}${process.env[`REACT_APP_${resource.toUpperCase()}_API_PATH`]}${param}`)
    const data = yield response.json()
    yield put(actions[`${resource}FetchedOkAction`](data))
    yield delay(process.env.REACT_APP_API_REFRESH_TIMEOUT)
  }
}

export function* fetchResourceAndSyncSaga () {
  while (true) {
    const { payload: { resource, param } } = yield take(FETCH_RESOURCE_AND_SYNC)
    const syncTask = yield fork(fetchResourceAndSync, { resource, param })
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
