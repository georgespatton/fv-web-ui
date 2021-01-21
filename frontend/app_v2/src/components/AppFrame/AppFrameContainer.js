import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link /*, useRouteMatch*/ } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import './AppFrame.css'
// import Header from 'components/Header'
import Hero from 'components/Hero'
import HeroBackground from 'components/Hero/hero-background.jpg'
import Content from 'components/Content'
import Suspender from 'components/Suspender'
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
        {/* <Header.Container className="AppV2__header" /> */}
        {/* Sample nav for header */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main role="main">
          <Suspender>
            <Switch>
              <Route path="/about">
                <Hero.Presentation
                  background={HeroBackground}
                  foreground={<h1>Our People</h1>}
                  foregroundIcon={<div>logo</div>}
                />
                <Content.Presentation
                  heading="Kwak'wala-speaking peoples"
                  body={
                    <div>
                      <p>
                        Eiusmod reprehenderit magna laboris do non do do dolore aute ex. Duis dolore sunt non cupidatat
                        duis cupidatat deserunt laboris id amet aliquip velit duis eu. Duis commodo consequat ea irure
                        ea ipsum consequat consectetur do sunt mollit. Id non laborum Lorem fugiat do. Magna aliqua
                        pariatur voluptate qui tempor sit magna aute ut officia laboris. Incididunt eiusmod
                        reprehenderit ullamco dolor est irure ex.
                      </p>

                      <p>
                        Adipisicing tempor sit enim non. Duis sit aliquip ipsum qui enim reprehenderit minim pariatur
                        veniam ea esse nisi ullamco. Eu ullamco sint minim aliquip in excepteur et do anim culpa dolore
                        commodo.
                      </p>

                      <p>
                        Sunt ea eiusmod est ipsum enim officia deserunt amet consectetur occaecat tempor esse. Enim id
                        commodo veniam culpa occaecat Lorem enim culpa ex sunt irure deserunt ea. Cupidatat fugiat Lorem
                        dolor consectetur aute excepteur mollit et sit officia magna duis fugiat anim.
                      </p>

                      <p>
                        Ut minim dolor eu minim ipsum enim eu sit consectetur labore cillum. Nulla ad incididunt veniam
                        proident dolore labore excepteur velit fugiat. Velit sint culpa qui elit culpa incididunt cillum
                        consectetur cillum. Nisi elit proident elit ut amet sit fugiat consequat eu ullamco ut. Mollit
                        minim ad proident cillum. In id elit officia sunt non cupidatat laborum quis et minim est.
                      </p>

                      <p>
                        Culpa eiusmod Lorem consectetur sunt anim laborum nisi fugiat. Lorem deserunt incididunt labore
                        non duis. Mollit aliquip pariatur eu ad sunt.
                      </p>
                    </div>
                  }
                />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Suspender>
        </main>
      </div>
    </Router>
  )
}

// Example sub-pages that would be imported/lazy loaded
// ============================================================
function Home() {
  return <h2>Home</h2>
}

// function About() {
//   const match = useRouteMatch()

//   return (
//     <>
//       <h2>About</h2>

//       <Link to="/about/subpage">Go to About subpage</Link>
//       <Route path={`${match.url}/subpage`}>
//         <div>This is a subpage for About</div>
//       </Route>
//     </>
//   )
// }

export default AppFrameContainer
