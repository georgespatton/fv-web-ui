import { CLEAR_CACHE_ITEM } from './actionTypes'

export const clearCacheItem = ({ id, reducer }) => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CACHE_ITEM, action: { id, reducer } })
  }
}
