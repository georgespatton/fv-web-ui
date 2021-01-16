import React from 'react'
import Header from 'components/Header'
// import Something from 'app_v1/Something'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  // useParams,
  // useLocation,
} from 'react-router-dom'


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

function App() {
  return (
    <div className="AppV2">
      <Header.Container className="AppV2__header" />

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
  )
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

export default App
