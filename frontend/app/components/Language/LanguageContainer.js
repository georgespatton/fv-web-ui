import React from 'react'
import PropTypes from 'prop-types'
import LanguageData from 'components/Language/LanguageData'
import LanguageContext from 'components/Language/LanguageContext'
/**
 * @summary LanguageContainer
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */

function LanguageContainer({ children, dialectId }) {
  return (
    <LanguageData dialectId={dialectId}>
      {(data) => {
        return <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
      }}
    </LanguageData>
  )
}
// PROPTYPES
const { node } = PropTypes
LanguageContainer.propTypes = {
  children: node,
}

export default LanguageContainer
