import React from 'react'
import PropTypes from 'prop-types'

// REDUX
import { Provider as _Provider } from 'react-redux'
import store from 'state/store'

/**
 * @summary Provider
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 * @param {string} dialectName
 * @param {boolean} isPrint
 * @returns {node} jsx markup
 */
function Provider({ children }) {
  return <_Provider store={store}>{children}</_Provider>
}
// PROPTYPES
const { node } = PropTypes
Provider.propTypes = {
  children: node,
}

export default Provider
