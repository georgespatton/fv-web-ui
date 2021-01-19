import React from 'react'
// import PropTypes from 'prop-types'
import HeaderMenu from 'components/HeaderMenu'
import DialectHeaderMobile from './DialectHeaderMobile'

import logo from 'assets/images/logo.png'
import AboutIcon from 'assets/icons/AboutIcon'
import DictionaryIcon from 'assets/icons/DictionaryIcon'
import KidsIcon from 'assets/icons/KidsIcon'
import LearnIcon from 'assets/icons/LearnIcon'
import ResourcesIcon from 'assets/icons/ResourcesIcon'

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
  const [navbarOpen, setNavbarOpen] = React.useState(false)

  const openCloseNavbar = () => {
    setNavbarOpen(!navbarOpen)
  }
  const menuData = [
    {
      title: 'Dictionary',
      icon: <DictionaryIcon styling={'fill-current h-8 w-6 text-xl'} />,
      itemsData: [
        { title: 'Words', href: '/dialect/words' },
        { title: 'Phrases', href: '/dialect/phrases' },
      ],
    },
    { title: 'Learn', icon: <LearnIcon styling={'fill-current h-8 w-6 text-xl'} /> },
    { title: 'Resources', icon: <ResourcesIcon styling={'fill-current h-8 w-6 text-xl'} /> },
    { title: 'About', icon: <AboutIcon styling={'fill-current h-8 w-6 text-xl'} /> },
    { title: 'Kids', icon: <KidsIcon styling={'fill-current h-8 w-6 text-xl'} /> },
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
            <div className="flex justify-start lg:flex-1">
              <a href="/home">
                <span className="sr-only">FirstVoices Logo</span>
                <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                onClick={() => openCloseNavbar()}
                className="bg-fv-charcoal rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {navbarOpen ? (
                    // X icon
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    // Hamburger menu icon
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            <nav className="hidden md:flex space-x-4">{menus}</nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
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
      {navbarOpen ? <DialectHeaderMobile openCloseNavbar={openCloseNavbar} menuData={menuData} /> : null}
    </header>
  )
}
// PROPTYPES
// const { string } = PropTypes
DialectHeaderPresentation.propTypes = {
  //   something: string,
}

export default DialectHeaderPresentation
