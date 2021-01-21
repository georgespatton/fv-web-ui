import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ChevronDownIcon from 'assets/icons/ChevronDownIcon'

/**
 * @summary HeaderMenuPresentation
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function HeaderMenuPresentation({ title, icon, itemsData, href }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasItems = !Array.isArray(itemsData) || !itemsData.length ? false : true
  const menuItems = itemsData
    ? itemsData.map((menuItem) => (
        <HeaderMenuItem key={`HeaderMenu_${menuItem.title}`} title={menuItem.title} href={menuItem.href} />
      ))
    : null

  const onMenuClick = () => {
    if (href) {
      window.location.href = href
    } else if (hasItems) {
      setIsOpen(!isOpen)
    }
  }
  return (
    <div id={`HeaderMenu_${title}`} className="relative">
      <button
        type="button"
        onClick={() => {
          onMenuClick()
        }}
        onBlur={() => {
          setIsOpen(false)
        }}
        className="group p-2 bg-fv-charcoal rounded-md  inline-flex items-center text-lg font-medium text-white hover:text-gray-100 focus:outline-none"
      >
        {icon}
        <p className="ml-3 mr-2">{title}</p>
        {hasItems ? <ChevronDownIcon styling={'fill-current h-8'} /> : null}
      </button>
      {/*
        'Solutions' flyout menu, show/hide based on flyout menu state.

        Entering: "transition ease-out duration-200"
        From: "opacity-0 translate-y-1"
        To: "opacity-100 translate-y-0"
        Leaving: "transition ease-in duration-150"
        From: "opacity-100 translate-y-0"
        To: "opacity-0 translate-y-1" */}
      {isOpen && hasItems ? (
        <div className="absolute z-10 mt-3 w-48 transform px-2 sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative grid gap-6 bg-white px-2 py-6 sm:gap-8 sm:p-8">{menuItems}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function HeaderMenuItem({ title, href }) {
  return (
    <a href={href} className="-m-3 py-1 flex items-start rounded-lg hover:bg-gray-50">
      <div className="ml-4">
        <p className="text-lg font-medium text-black">{title}</p>
      </div>
    </a>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
HeaderMenuPresentation.propTypes = {
  title: string,
  icon: object,
  href: string,
  itemsData: array,
}

export default HeaderMenuPresentation
