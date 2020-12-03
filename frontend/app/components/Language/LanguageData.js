import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import selectn from 'selectn'

import usePortal from 'dataSources/usePortal'
import useRoute from 'dataSources/useRoute'
import ProviderHelpers from 'common/ProviderHelpers'
/**
 * @summary LanguageData
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 * @param {function} props.children
 *
 */

function LanguageData({ children }) {
  const [languageCache, setLanguageCache] = useState()
  const { computePortal } = usePortal()
  const { routeParams } = useRoute()
  const { dialect_path: dialectPath } = routeParams
  const extractComputePortal = ProviderHelpers.getEntry(computePortal, `${dialectPath}/Portal`)
  useEffect(() => {
    // console.log('loaded')
  }, [])
  const success = selectn('success', extractComputePortal)
  useEffect(() => {
    const dialectUid = selectn('response.contextParameters.ancestry.dialect.uid', extractComputePortal)
    if (dialectUid && selectn(dialectUid, languageCache) === undefined) {
      // console.log(`languageCache update: ${dialectUid}`)
      const newLanguageCache = { ...languageCache }
      newLanguageCache[dialectUid] = extractComputePortal
      setLanguageCache(newLanguageCache)
    }
  }, [success])

  return children({
    languageCache,
  })
}
// PROPTYPES
const { func } = PropTypes
LanguageData.propTypes = {
  children: func,
}

export default LanguageData
