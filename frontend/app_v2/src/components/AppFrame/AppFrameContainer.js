import React from 'react'
// import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  // useParams,
  // useLocation,
} from 'react-router-dom'

import './AppFrame.css'
import Header from 'components/Header'

// // const query = useQuery()
// // console.log(query.get('name'))
// function useQuery() {
//   // React Router does not have any opinions about
//   // how you should parse URL query strings.
//   //
//   // If you use simple key=value query strings and
//   // you do not need to support IE 11, you can use
//   // the browser's built-in URLSearchParams API.
//   //
//   // If your query strings contain array or object
//   // syntax, you'll probably need to bring your own
//   // query parsing function.
//   return new URLSearchParams(useLocation().search)
// }

/**
 * @summary AppFrameContainer
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function AppFrameContainer() {
  return (
    <Router>
      <div className="AppFrame">
        <Header.Container className="AppV2__header" />
        {/* Sample nav for header */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
// PROPTYPES
// const { string } = PropTypes
AppFrameContainer.propTypes = {
  //   something: string,
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  const match = useRouteMatch()

  return (
    <>
      <h2>About</h2>

      <Link to="/about/subpage">Go to About subpage</Link>
      <Route path={`${match.url}/subpage`}>
        <div>This is a subpage for About</div>
      </Route>
    </>
  )
}

function Users() {
  return <h2>Users</h2>
}

export default AppFrameContainer
