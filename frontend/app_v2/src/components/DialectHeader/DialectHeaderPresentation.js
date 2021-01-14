import React from 'react'
// import PropTypes from 'prop-types'
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
  return (
    <header id="Dialect_header" className="">
      <div className="relative bg-fv-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">FirstVoices Logo</span>
                <img className="h-8 w-auto sm:h-10" src="assets/images/logo.png" alt="" />
              </a>
            </div>
            <nav className="hidden md:flex space-x-10">
              <div className="relative">
                <button
                  type="button"
                  className="group bg-fv-charcoal rounded-md  inline-flex items-center text-base font-medium text-white hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fv-turquoise"
                >
                  <span>Dictionary</span>
                </button>
              </div>

              <a href="#" className="text-base font-medium  text-white hover:text-gray-100">
                Learn
              </a>
              <a href="#" className="text-base font-medium  text-white hover:text-gray-100">
                Resources
              </a>

              <div className="relative">
                <button
                  type="button"
                  className="group bg-fv-charcoal rounded-md inline-flex items-center text-base font-medium  text-white hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span>About</span>
                </button>
              </div>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="#" className="whitespace-nowrap text-base font-medium text-white hover:text-gray-100">
                Sign in
              </a>
              <a
                href="#"
                className="mx-4 whitespace-nowrap inline-flex items-center justify-center border border-transparent rounded-full py-1 px-3 shadow-sm text-base font-medium text-white bg-fv-orange hover:bg-fv-orange-dark"
              >
                Join
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
