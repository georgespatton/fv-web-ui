import React from 'react'
import PropTypes from 'prop-types'

import ChevronRightIcon from 'assets/icons/ChevronRightIcon'
import LoginIcon from 'assets/icons/LoginIcon'

/**
 * @summary DialectHeaderPresentation
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function DialectHeaderMobile({ menuData }) {
  const menus = menuData.map((menu) => (
    <div key={`${menu.title}_id`}>
      <button
        type="button"
        onClick={() => {}}
        className="w-full m-3 p-1 text-fv-blue flex items-center hover:bg-gray-50 focus:outline-none focus:ring-0"
      >
        {menu.icon}
        <p className="ml-3 text-fv-blue font-medium hover:text-fv-blue-dark">{menu.title}</p>
        {!Array.isArray(menu.itemsData) || !menu.itemsData.length ? null : (
          <ChevronRightIcon styling={'absolute right-3 fill-current h-12 w-8 text-lg'} />
        )}
      </button>
    </div>
  ))
  return (
    <div className="inset-x-0 transition transform origin-top-right md:hidden ">
      <div className="shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-200">
        <nav className="grid divide-y-2 divide-gray-200">
          {menus}
          <div key="SignIn_id">
            <button
              href="/nuxeo/logout?requestedUrl=login.jsp"
              type="button"
              onClick={() => {}}
              className="w-full m-3 p-1 text-fv-blue flex items-center hover:bg-gray-50 focus:outline-none"
            >
              <LoginIcon styling={'fill-current h-12 w-8 text-lg'} />
              <p className="ml-3 text-fv-blue font-medium hover:text-fv-blue-dark">Sign in</p>
            </button>
          </div>
        </nav>
        <div className="py-6 px-5 space-y-6">
          <div className="w-full flex items-center">
            <a
              href="/register?requestedUrl=/register"
              //className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-fv-orange  hover:bg-fv-orange-dark"
              className="w-32 h-12 mx-4 whitespace-nowrap inline-flex items-center justify-center border border-transparent rounded-full py-3 px-6 shadow-sm text-lg text-white bg-fv-orange hover:bg-fv-orange-dark"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { array } = PropTypes
DialectHeaderMobile.propTypes = {
  menuData: array,
}

export default DialectHeaderMobile
