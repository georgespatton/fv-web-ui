import PropTypes from 'prop-types'
import usePortal from 'dataSources/usePortal'
/**
 * @summary LanguageData
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 * @param {function} props.children
 *
 */

function LanguageData({ children }) {
  const { computePortal } = usePortal()
  return children({
    computePortal: computePortal.toJS(),
  })
}
// PROPTYPES
const { func } = PropTypes
LanguageData.propTypes = {
  children: func,
}

export default LanguageData
