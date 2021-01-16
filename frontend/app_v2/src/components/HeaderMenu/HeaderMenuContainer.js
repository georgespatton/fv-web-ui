import React from 'react'
// import PropTypes from 'prop-types'
import HeaderMenuPresentation from 'components/HeaderMenu/HeaderMenuPresentation'
import HeaderMenuData from 'components/HeaderMenu/HeaderMenuData'

/**
 * @summary HeaderMenuContainer
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function HeaderMenuContainer() {
  return (
    <HeaderMenuData>
      {(HeaderMenuDataOutput) => {
        // TODO FW-HeaderMenu
        // eslint-disable-next-line
        console.log('HeaderMenuDataOutput', HeaderMenuDataOutput)
        return <HeaderMenuPresentation />
      }}
    </HeaderMenuData>
  )
}
// PROPTYPES
// const { string } = PropTypes
HeaderMenuContainer.propTypes = {
  //   something: string,
}

export default HeaderMenuContainer
