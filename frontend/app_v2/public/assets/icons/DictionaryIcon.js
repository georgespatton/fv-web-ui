import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary DialectHeaderPresentation
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function DictionaryIcon({ styling }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className={styling}>
      <g>
        <path
          d="M194.076,228.622a.9.9,0,0,0-.846.723v1.425a.872.872,0,0,0,.847.692c.657,0,1.033-.522,1.033-1.432,0-.33-.075-1.408-1.033-1.408"
          transform="translate(-180.261 -213.279)"
        />
        <path d="M82.667,209.573h1.176l-.607-2.11Z" transform="translate(-77.119 -193.54)" />
        <path d="M2.48,0,0,3.642,0,26.613H0V28.5H20.034v-.026l.062.006,3.691-2.823V0ZM7.757,19.97l-.628-2.09H5.151l-.58,2.09h-2.4L4.8,11.358H7.562l2.67,8.611Zm8.523-.737a2.783,2.783,0,0,1-2.03.87,2.24,2.24,0,0,1-1.615-.609l-.042.476H10.63l0-9.046h2.306v3.038a2.488,2.488,0,0,1,1.577-.5,2.46,2.46,0,0,1,1.784.732,3.447,3.447,0,0,1,.891,2.489,3.606,3.606,0,0,1-.911,2.552m5.493,5.429-1.739,1.33V3.642H2.448l1.1-1.629H21.773Z" />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
DictionaryIcon.propTypes = {
  styling: string,
}

export default DictionaryIcon
