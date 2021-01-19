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
function KidsIcon({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34.486"
      height="28.216"
      viewBox="0 0 34.486 28.216"
      className={styling}
    >
      <g id="Icon_material-child-care" data-name="Icon material-child-care" transform="translate(-1.5 -4.5)">
        <path
          id="Path_136"
          data-name="Path 136"
          d="M22.151,15.013a1.138,1.138,0,1,1-1.138-1.138,1.138,1.138,0,0,1,1.138,1.138Z"
          transform="translate(1.859 1.085)"
        />
        <path
          id="Path_137"
          data-name="Path 137"
          d="M14.651,15.013a1.138,1.138,0,1,1-1.138-1.138,1.138,1.138,0,0,1,1.138,1.138Z"
          transform="translate(1.101 1.085)"
        />
        <path
          id="Path_138"
          data-name="Path 138"
          d="M35.892,19.643a5.737,5.737,0,0,0,0-2.069,6.283,6.283,0,0,0-4.4-4.969,14.287,14.287,0,0,0-3.433-4.562A14.094,14.094,0,0,0,6,12.6a6.261,6.261,0,0,0-4.4,4.969,5.737,5.737,0,0,0,0,2.069A6.283,6.283,0,0,0,6,24.612a14.071,14.071,0,0,0,3.4,4.53,14.019,14.019,0,0,0,18.7,0,14.242,14.242,0,0,0,3.4-4.53,6.267,6.267,0,0,0,4.389-4.969Zm-6.176,2.1a4.467,4.467,0,0,1-.455-.047,11.236,11.236,0,0,1-1.348,2.916,10.946,10.946,0,0,1-18.341,0A11.236,11.236,0,0,1,8.225,21.7a4.468,4.468,0,0,1-.455.047,3.135,3.135,0,0,1,0-6.27,4.468,4.468,0,0,1,.455.047A11.236,11.236,0,0,1,9.573,12.6a10.946,10.946,0,0,1,18.341,0,11.236,11.236,0,0,1,1.348,2.916,4.468,4.468,0,0,1,.455-.047,3.135,3.135,0,1,1,0,6.27Zm-18.027,0a7.642,7.642,0,0,0,14.108,0Z"
          transform="translate(0)"
        />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
KidsIcon.propTypes = {
  styling: string,
}

export default KidsIcon
