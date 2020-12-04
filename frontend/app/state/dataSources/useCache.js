import { useDispatch } from 'react-redux'
import { clearCacheItem as _clearCacheItem } from 'reducers/cache'

function useCache() {
  const dispatch = useDispatch()

  const clearCacheItem = ({ id, reducer }) => {
    const dispatchObj = _clearCacheItem({ id, reducer })
    dispatch(dispatchObj)
  }

  return {
    clearCacheItem,
  }
}

export default useCache
