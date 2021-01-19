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
function LearnIcon({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38.211"
      height="25.474"
      viewBox="0 0 38.211 25.474"
      className={styling}
    >
      <path
        id="Icon_material-computer"
        data-name="Icon material-computer"
        d="M31.842,28.29a3.18,3.18,0,0,0,3.168-3.184l.016-15.921A3.194,3.194,0,0,0,31.842,6H6.368A3.194,3.194,0,0,0,3.184,9.184V25.105A3.194,3.194,0,0,0,6.368,28.29H0v3.184H38.211V28.29ZM6.368,9.184H31.842V25.105H6.368Z"
        transform="translate(0 -6)"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
LearnIcon.propTypes = {
  styling: string,
}

export default LearnIcon
