import PropTypes from 'prop-types'

/**
 * @summary TestData
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 * @param {function} props.children
 *
 */
function TestData({ children }) {
  return children({
    log: 'Output from TestData',
  })
}
// PROPTYPES
const { func } = PropTypes
TestData.propTypes = {
  children: func,
}

export default TestData
