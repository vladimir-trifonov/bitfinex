import { take, put, fork } from 'redux-saga/effects'
import actions, { FETCH_RESOURCE } from '../actions'

function* fetchResource ({ resource, param }) {
  const url = `${process.env.REACT_APP_BITFINEX_API_URL}${process.env[`REACT_APP_${resource.toUpperCase()}_API_PATH`].replace(':param', param)}`
  const response = yield fetch(url)
  const data = yield response.json()
  yield put(actions[`${resource}FetchedOkAction`](data))
}

export function* fetchResourceSaga () {
  while (true) {
    const { payload: { resource, param } } = yield take(FETCH_RESOURCE)
    yield fork(fetchResource, { resource, param })
  }
}
