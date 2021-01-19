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
function AboutIcon({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24.474"
      height="24.474"
      viewBox="0 0 24.474 24.474"
      className={styling}
    >
      <path
        id="Icon_ionic-md-person"
        data-name="Icon ionic-md-person"
        d="M16.737,16.737a6.118,6.118,0,1,0-6.118-6.118A6.136,6.136,0,0,0,16.737,16.737Zm0,3.059C12.684,19.8,4.5,21.861,4.5,25.915v3.059H28.974V25.915C28.974,21.861,20.79,19.8,16.737,19.8Z"
        transform="translate(-4.5 -4.5)"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
AboutIcon.propTypes = {
  styling: string,
}

export default AboutIcon
