import { combineReducers } from 'redux'
import { CLEAR_CACHE_ITEM } from './actionTypes'
function updateCache({ action, actionFormatter, actionType, state }) {
  if (action.type === CLEAR_CACHE_ITEM) {
    const { id, reducer } = action.action
    if (reducer === state.meta.reducer) {
      const filteredState = {}
      for (const [key, value] of Object.entries(state)) {
        if (key !== id) {
          filteredState[key] = value
        }
      }
      return filteredState
    }
    return state
  }
  if (action.type === actionType && action.pathOrId.toLowerCase().includes('/fv/sections')) {
    const newState = {
      ...state,
      [action.pathOrId]: actionFormatter ? actionFormatter(action) : action,
    }
    return newState
  }
  return state
}
const cacheList = {
  computeCharacters: 'FV_CHARACTERS_QUERY_SUCCESS',
  computePortal: 'FV_PORTAL_FETCH_SUCCESS',
}
const cacheActions = Object.values(cacheList)
export const cacheReducer = combineReducers({
  // Since we aren't triggering cache specific actions we rely on updateCount to decide what to save into local cache
  updateCount(state = 0, action) {
    if (
      action.type === CLEAR_CACHE_ITEM ||
      (cacheActions.includes(action.type) && action.pathOrId.toLowerCase().includes('/fv/sections'))
    ) {
      return state + 1
    }
    return state
  },
  computeCharacters(state = { meta: { reducer: 'computeCharacters' } }, action) {
    return updateCache({
      action,
      actionType: cacheList.computeCharacters,
      state,
    })
  },
  computePortal(state = { meta: { reducer: 'computePortal' } }, action) {
    return updateCache({
      action,
      actionType: cacheList.computePortal,
      actionFormatter: (_action) => {
        return {
          action: _action.type,
          id: _action.pathOrId,
          isFetching: false,
          message: _action.message,
          response: _action.response,
          success: true,
        }
      },
      state,
    })
  },
})
