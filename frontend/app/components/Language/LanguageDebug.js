import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import LanguageContext from 'components/Language/LanguageContext'
/**
 * @summary LanguageDebug
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */

function LanguageDebug() {
  const value = useContext(LanguageContext)
  // eslint-disable-next-line
  console.log('LanguageDebug', value)
  return <div>LanguageDebug</div>
}
// PROPTYPES
const { node } = PropTypes
LanguageDebug.propTypes = {
  children: node,
}

export default LanguageDebug
