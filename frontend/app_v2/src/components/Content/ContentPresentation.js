import React from 'react'
import PropTypes from 'prop-types'
import './Content.css'
/**
 * @summary ContentPresentation
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function ContentPresentation({ heading, body }) {
  return (
    <section className="Content">
      <h1>{heading}</h1>
      {body}
    </section>
  )
}
// PROPTYPES
const { node } = PropTypes
ContentPresentation.propTypes = {
  heading: node,
  body: node,
}

export default ContentPresentation
