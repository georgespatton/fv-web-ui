import React, { useState } from 'react'
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
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)
  const [workspaceMode, setWorkspaceMode] = useState(false)

  const openCloseNavbar = () => {
    setMobileNavbarOpen(!mobileNavbarOpen)
  }

  const onWorkspaceModeClick = () => {
    setWorkspaceMode(!workspaceMode)
  }

  const toggleInputClass = workspaceMode ? ' border-fv-green right-0' : ' border-fv-warning-red'
  const toggleLabelClass = workspaceMode ? ' bg-fv-green right-0' : ' bg-fv-warning-red'

  // Hardcoding menu data temporarily
  // TODO: Store menu data on dialect
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
  const currentUser = { userInitials: 'PA' }

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
      <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 xl:px-20">
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
              >
                {mobileNavbarOpen ? (
                  // X icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger menu icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-6">{menus}</div>
          {/* <form name="searchForm" id="searchForm" action="/explore/FV/sections/Data/search">
                  <div className="">
                    <div className="">
                      <input
                        name="query"
                        placeholder="Search:"
                        type="search"
                      />
                      <input value="&#x1F50E;" type="submit" tabIndex="0" />
                    </div>
                  </div>
                </form> */}
          {!currentUser ? (
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
            </div>
          ) : (
            <div className="ml-8 hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile Avatar */}
                  <div className="ml-3 relative">
                    <div>
                      <button
                        className="max-w-xs p-3 bg-fv-orange  text-white text-xl rounded-full h-12 w-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                      >
                        <span className="sr-only">Open user menu</span>
                        {currentUser.userInitials}
                      </button>
                    </div>
                    {/* Profile dropdown */}
                    <div
                      className="text-base text-fv-charcoal font-medium origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 grid gap-4 sm:gap-8 sm:p-8"
                      role="menu"
                    >
                      <a href="/dashboard" className="block  hover:bg-gray-100" role="menuitem">
                        Dashboard
                      </a>
                      <div className="block hover:bg-gray-100">
                        <label htmlFor="toggle">Workspace Mode</label>
                        <div
                          onClick={() => onWorkspaceModeClick()}
                          className="relative inline-block float-right w-12 align-middle select-none transition duration-200 ease-in"
                        >
                          <input
                            type="checkbox"
                            name="toggle"
                            id="workspace-toggle"
                            className={`absolute block w-7 h-7 rounded-full bg-white border-2 appearance-none cursor-pointer focus:outline-none ${toggleInputClass}`}
                          />
                          <label
                            htmlFor="toggle"
                            className={`block overflow-hidden h-7 rounded-full cursor-pointer ${toggleLabelClass}`}
                          >
                            {workspaceMode ? (
                              <p className="text-white text-xxs p-0.5">ON</p>
                            ) : (
                              <p className="absolute text-white text-xxs p-0.5 right-0">OFF</p>
                            )}
                          </label>
                        </div>
                      </div>

                      <a href="/nuxeo/logout" className="block hover:bg-gray-100" role="menuitem">
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* -- Mobile Menu -- */}
      {mobileNavbarOpen ? <DialectHeaderMobile openCloseNavbar={openCloseNavbar} menuData={menuData} /> : null}
      <header className="bg-white shadow">
        <div className="max-w-screen-2xl py-6 px-4 sm:px-6 lg:px-8 xl:px-20 mx-auto">
          <h1 className="text-lg leading-tight text-gray-900">Breadcrumbs</h1>
        </div>
      </header>
    </div>
  )
}
// PROPTYPES
// const { string } = PropTypes
DialectHeaderPresentation.propTypes = {
  //   something: string,
}

export default DialectHeaderPresentation
