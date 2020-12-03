import { combineReducers } from 'redux'

function updateCache({ action, actionType, state }) {
  if (action.type === actionType && action.pathOrId.toLowerCase().includes('/fv/sections')) {
    const newState = {
      ...state,
      [action.pathOrId]: action,
    }
    return newState
  }
  return state
}
export const cacheReducer = combineReducers({
  computeCharacters(state = {}, action) {
    return updateCache({
      action,
      actionType: 'FV_CHARACTERS_QUERY_SUCCESS',
      state,
    })
  },
  computePortal(state = {}, action) {
    return updateCache({
      action,
      actionType: 'FV_PORTAL_FETCH_SUCCESS',
      state,
    })
  },
})
