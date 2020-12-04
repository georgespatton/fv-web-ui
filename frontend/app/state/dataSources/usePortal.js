import { useDispatch, useSelector } from 'react-redux'
import { fetchPortal as _fetchPortal, updatePortal as _updatePortal } from 'reducers/fvPortal'

function usePortal() {
  const dispatch = useDispatch()

  const fetchPortal = (pathOrId, messageStart, messageSuccess, messageError, propertiesOverride) => {
    const dispatchObj = _fetchPortal(pathOrId, messageStart, messageSuccess, messageError, propertiesOverride)
    dispatch(dispatchObj)
  }
  const updatePortal = (pathOrId, messageStart, messageSuccess, messageError, propertiesOverride) => {
    const dispatchObj = _updatePortal(pathOrId, messageStart, messageSuccess, messageError, propertiesOverride)
    dispatch(dispatchObj)
  }

  return {
    computePortal: useSelector((state) => state.fvPortal.computePortal),
    cacheComputePortal: useSelector((state) => state.cache.computePortal),
    fetchPortal,
    updatePortal,
  }
}

export default usePortal
