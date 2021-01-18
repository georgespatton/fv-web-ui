import React from 'react'
// import PropTypes from 'prop-types'
import HeaderMenu from 'components/HeaderMenu'

import AboutIcon from 'assets/svg/about.svg'
import DictionaryIcon from 'assets/svg/dictionary.svg'
import KidsIcon from 'assets/svg/kids.svg'
import LearnIcon from 'assets/svg/learn.svg'
import ResourcesIcon from 'assets/svg/resources.svg'
import logo from 'assets/images/logo.png'

/**
 * @summary DialectHeaderPresentation
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function DialectHeaderPresentation() {
  const menuData = [
    {
      title: 'Dictionary',
      icon: DictionaryIcon,
      itemsData: [
        { title: 'Words', href: '/dialect/words' },
        { title: 'Phrases', href: '/dialect/phrases' },
      ],
    },
    { title: 'Learn', icon: LearnIcon },
    { title: 'Resources', icon: ResourcesIcon },
    { title: 'About', icon: AboutIcon },
    { title: 'Kids', icon: KidsIcon },
  ]

  const menus = menuData.map((menu) => (
    <HeaderMenu.Presentation
      key={`HeaderMenu_${menu.title}`}
      title={menu.title}
      icon={menu.icon}
      itemsData={menu.itemsData}
    />
  ))

  return (
    <header id="Dialect_header" className="">
      <div className="relative bg-fv-charcoal">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/home">
                <span className="sr-only">FirstVoices Logo</span>
                <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
              </a>
            </div>
            <nav className="md:flex space-x-4">{menus}</nav>
            <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="/nuxeo/logout?requestedUrl=login.jsp"
                className="whitespace-nowrap text-xl font-medium text-white hover:text-gray-100"
              >
                Sign in
              </a>
              <a
                href="/register?requestedUrl=/register"
                className="mx-4 whitespace-nowrap inline-flex items-center justify-center border border-transparent rounded-full py-1 px-3 shadow-sm text-xl font-medium text-white bg-fv-orange hover:bg-fv-orange-dark"
              >
                Register
              </a>
              {/* <form name="searchForm" id="searchForm" action="/explore/FV/sections/Data/search">
                  <div className="">
                    <div className="">
                      <input
                        aria-invalid="false"
                        aria-label="Search FirstVoices"
                        name="query"
                        placeholder="Search:"
                        type="search"
                      />
                      <input value="&#x1F50E;" type="submit" tabIndex="0" />
                    </div>
                  </div>
                </form> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
// PROPTYPES
// const { string } = PropTypes
DialectHeaderPresentation.propTypes = {
  //   something: string,
}

export default DialectHeaderPresentation
