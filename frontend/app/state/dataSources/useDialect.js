import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDialect as _fetchDialect,
  fetchDialect2 as _fetchDialect2,
  republishDialect as _republishDialect,
  updateDialect2 as _updateDialect2,
} from 'reducers/fvDialect'
function useDialect() {
  const dispatch = useDispatch()

  const fetchDialect = (pathOrId, messageStart, messageSuccess, messageError, propertiesOverride) => {
    const dispatchObj = _fetchDialect(pathOrId, messageStart, messageSuccess, messageError, propertiesOverride)
    dispatch(dispatchObj)
  }
  const fetchDialect2 = (pathOrId, messageStart, messageSuccess, messageError, propertiesOverride) => {
    const dispatchObj = _fetchDialect2(pathOrId, messageStart, messageSuccess, messageError, propertiesOverride)
    dispatch(dispatchObj)
  }
  const republishDialect = (pathOrId, messageStart, messageSuccess, messageError, propertiesOverride) => {
    const dispatchObj = _republishDialect(pathOrId, messageStart, messageSuccess, messageError, propertiesOverride)
    dispatch(dispatchObj)
  }
  const updateDialect2 = (pathOrId, messageStart, messageSuccess, messageError, propertiesOverride) => {
    const dispatchObj = _updateDialect2(pathOrId, messageStart, messageSuccess, messageError, propertiesOverride)
    dispatch(dispatchObj)
  }

  return {
    computeDialect: useSelector((state) => state.fvDialect.computeDialect),
    computeDialect2: useSelector((state) => state.fvDialect.computeDialect2),
    fetchDialect,
    fetchDialect2,
    republishDialect,
    updateDialect2,
  }
}

export default useDialect
