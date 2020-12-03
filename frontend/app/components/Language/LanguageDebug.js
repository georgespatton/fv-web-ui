import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import LanguageContext from 'components/Language/LanguageContext'
import Link from 'components/Link'
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
  // eslint-disable-next-line
  const value = useContext(LanguageContext)
  return (
    <ul>
      <li>
        <Link href="/explore/FV/sections/Data/Test/Test/ioo%E1%91%8E%E1%BA%84ij">iooᑎẄij</Link>
      </li>
      <li>
        <Link href="/explore/FV/sections/Data/C/C/C">C</Link>
      </li>

      <li>
        <Link href="/">Home</Link>
      </li>
    </ul>
  )
}
// PROPTYPES
const { node } = PropTypes
LanguageDebug.propTypes = {
  children: node,
}

export default LanguageDebug
