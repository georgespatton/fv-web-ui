import { useDispatch } from 'react-redux'
import { clearCacheItem as _clearCacheItem } from 'reducers/cache'

function usePortal() {
  const dispatch = useDispatch()

  const clearCacheItem = ({ id, reducer }) => {
    const dispatchObj = _clearCacheItem({ id, reducer })
    dispatch(dispatchObj)
  }

  return {
    clearCacheItem,
  }
}

export default usePortal
