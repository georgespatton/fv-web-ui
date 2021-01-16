import React from 'react'
import PropTypes from 'prop-types'
function Header({ className }) {
  return <header className={`Header ${className}`}>Header v2</header>
}
// PROPTYPES
const { string } = PropTypes
Header.propTypes = {
  className: string,
}
Header.defaultProps = {
  className: '',
}
export default Header
