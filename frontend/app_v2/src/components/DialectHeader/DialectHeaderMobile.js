import React from 'react'
import PropTypes from 'prop-types'

import ChevronDownIcon from 'assets/svg/chevron_down.svg'

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
    <button
      key={`${menu.title}_id`}
      type="button"
      onClick={() => {}}
      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
    >
      {menu.icon}
      <p className="ml-3 text-base font-medium text-gray-900">{menu.title}</p>
      {!Array.isArray(menu.itemsData) || !menu.itemsData.length ? null : <img src={ChevronDownIcon} alt="Show more" />}
    </button>
  ))
  return (
    <div className="inset-x-0 transition transform origin-top-right md:hidden ">
      <div className="shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
        <div className="pt-5 pb-6 px-5">
          <div className="mt-6">
            <nav className="grid gap-y-8">{menus}</nav>
          </div>
        </div>
        <div className="py-6 px-5 space-y-6">
          <div>
            {/* <a
              href="/register?requestedUrl=/register"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-fv-orange  hover:bg-fv-orange-dark"
            >
              Register
            </a>
            <p className="mt-6 text-center text-base font-medium text-gray-500">
              Existing customer?
              <a href="/nuxeo/logout?requestedUrl=login.jsp" className="text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p> */}
            <a
              href="/nuxeo/logout?requestedUrl=login.jsp"
              className="whitespace-nowrap text-xl font-medium text-black hover:text-gray-500"
            >
              Sign in
            </a>
            <a
              href="/register?requestedUrl=/register"
              className="mx-4 whitespace-nowrap inline-flex items-center justify-center border border-transparent rounded-full py-1 px-3 shadow-sm text-xl font-medium text-white bg-fv-orange hover:bg-fv-orange-dark"
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
