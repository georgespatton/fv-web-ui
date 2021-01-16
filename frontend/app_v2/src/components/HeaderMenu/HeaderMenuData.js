import PropTypes from 'prop-types'

/**
 * @summary HeaderMenuData
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 * @param {function} props.children
 *
 */
function HeaderMenuData({ children }) {
  return children({
    log: 'Output from HeaderMenuData',
  })
}
// PROPTYPES
const { func } = PropTypes
HeaderMenuData.propTypes = {
  children: func,
}

export default HeaderMenuData
