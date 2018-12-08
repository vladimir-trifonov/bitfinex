import { createAction } from 'redux-actions'

export const FETCH_RESOURCE_AND_SYNC = 'FETCH_RESOURCE_AND_SYNC'
export const STOP_RESOURCE_SYNC = 'STOP_RESOURCE_SYNC'

export const fetchResourceAndSyncAction = createAction(FETCH_RESOURCE_AND_SYNC)
export const stopResourceSyncAction = createAction(STOP_RESOURCE_SYNC)
