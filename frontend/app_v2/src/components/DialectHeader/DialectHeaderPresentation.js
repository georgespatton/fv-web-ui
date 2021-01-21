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
      icon: <DictionaryIcon styling={'fill-current h-12 w-8'} />,
      itemsData: [
        { title: 'Words', href: '/dialect/words' },
        { title: 'Phrases', href: '/dialect/phrases' },
        { title: 'Alphabet', href: '/dialect/alphabet' },
        { title: 'Browse by Topic', href: '/dialect/topics' },
      ],
    },
    {
      title: 'Learn',
      icon: <LearnIcon styling={'fill-current h-12 w-8'} />,
      itemsData: [
        { title: 'Songs', href: '/dialect/songs' },
        { title: 'Stories', href: '/dialect/stories' },
        { title: 'Games', href: '/dialect/games' },
      ],
    },
    {
      title: 'Resources',
      icon: <ResourcesIcon styling={'fill-current h-12 w-8'} />,
      itemsData: [
        { title: 'Kids Site', href: '/dialect/kids' },
        { title: 'Mobile App', href: '/dialect/app' },
        { title: 'Keyboard App', href: '/dialect/keyboard' },
      ],
    },
    {
      title: 'About',
      icon: <AboutIcon styling={'fill-current h-12 w-8'} />,
      itemsData: [
        { title: 'Our Language', href: '/dialect/ourlanguage' },
        { title: 'Our People', href: '/dialect/ourpeople' },
      ],
    },
    { title: 'Kids', icon: <KidsIcon styling={'fill-current h-12 w-8'} />, href: '/dialect/kids' },
  ]

  const menus = menuData.map((menu) => (
    <HeaderMenu.Presentation
      key={`HeaderMenu_${menu.title}`}
      title={menu.title}
      icon={menu.icon}
      itemsData={menu.itemsData}
      href={menu.href ? menu.href : null}
    />
  ))

  return (
    <div id="Dialect_header" className="relative bg-fv-charcoal">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 xl:px-20">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
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

          <nav className="hidden md:flex space-x-6">{menus}</nav>
          <div className="ml-8 hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="/nuxeo/logout?requestedUrl=login.jsp"
              className="whitespace-nowrap text-lg font-medium text-white hover:text-gray-100"
            >
              Sign in
            </a>
            <a
              href="/register?requestedUrl=/register"
              className="ml-4 whitespace-nowrap inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-3xl  shadow-sm text-base font-medium text-white bg-fv-orange hover:bg-fv-orange-dark"
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
      {navbarOpen ? <DialectHeaderMobile openCloseNavbar={openCloseNavbar} menuData={menuData} /> : null}
    </div>
  )
}
// PROPTYPES
// const { string } = PropTypes
DialectHeaderPresentation.propTypes = {
  //   something: string,
}

export default DialectHeaderPresentation
