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
    <svg
      id="Group_90"
      className={styling}
      data-name="Group 90"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="23.787"
      height="28.499"
      viewBox="0 0 23.787 28.499"
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{ __html: '\n      .cls-2 {\n        clip-path: url(#clip-path);\n      }\n    ' }}
        />
        <clipPath id="clip-path">
          <rect id="Rectangle_417" data-name="Rectangle 417" className="cls-1" width="23.787" height="28.499" />
        </clipPath>
      </defs>
      <g id="Group_89" data-name="Group 89" className="cls-2">
        <path
          id="Path_133"
          data-name="Path 133"
          d="M194.076,228.622a.9.9,0,0,0-.846.723v1.425a.872.872,0,0,0,.847.692c.657,0,1.033-.522,1.033-1.432,0-.33-.075-1.408-1.033-1.408"
          transform="translate(-180.261 -213.279)"
        />
        <path
          id="Path_134"
          data-name="Path 134"
          d="M82.667,209.573h1.176l-.607-2.11Z"
          transform="translate(-77.119 -193.54)"
        />
        <path
          id="Path_135"
          data-name="Path 135"
          d="M2.48,0,0,3.642,0,26.613H0V28.5H20.034v-.026l.062.006,3.691-2.823V0ZM7.757,19.97l-.628-2.09H5.151l-.58,2.09h-2.4L4.8,11.358H7.562l2.67,8.611Zm8.523-.737a2.783,2.783,0,0,1-2.03.87,2.24,2.24,0,0,1-1.615-.609l-.042.476H10.63l0-9.046h2.306v3.038a2.488,2.488,0,0,1,1.577-.5,2.46,2.46,0,0,1,1.784.732,3.447,3.447,0,0,1,.891,2.489,3.606,3.606,0,0,1-.911,2.552m5.493,5.429-1.739,1.33V3.642H2.448l1.1-1.629H21.773Z"
        />
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
