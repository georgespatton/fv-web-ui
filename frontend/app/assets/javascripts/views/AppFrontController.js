import React, { Component, PropTypes } from 'react'
import Immutable, { List } from 'immutable'

import provide from 'react-redux-provide'
import selectn from 'selectn'

import classNames from 'classnames'

import ConfGlobal from 'conf/local.js'
import ConfRoutes, { matchPath } from 'conf/routes'

import ProviderHelpers from 'common/ProviderHelpers'
// import UIHelpers from 'common/UIHelpers'
import StringHelpers from 'common/StringHelpers'
// import AnalyticsHelpers from 'common/AnalyticsHelpers'

import FlatButton from 'material-ui/lib/flat-button'
import Navigation from 'views/components/Navigation'
import WorkspaceSwitcher from 'views/components/Navigation/workspace-switcher'
import KidsNavigation from 'views/components/Kids/navigation'
import Footer from 'views/components/Navigation/Footer'
import Breadcrumb from 'views/components/Breadcrumb'

import IntlService from 'views/services/intl'

import { PageError } from 'views/pages'

const intl = IntlService.instance

const PAGE_NOT_FOUND_TITLE =
  '404 - ' +
  intl.translate({
    key: 'errors.page_not_found',
    default: 'Page Not Found',
    case: 'first',
  })

const PAGE_NOT_FOUND_BODY = (
  <div>
    <p>
      {intl.translate({
        key: 'errors.report_via_feedback',
        default: 'Please report this error so that we can fix it',
        case: 'first',
      })}
      .
    </p>
    <p>
      {intl.translate({
        key: 'errors.feedback_include_link',
        default: 'Include what link or action you took to get to this page',
      })}
      .
    </p>
    <p>
      {intl.translate({
        key: 'thank_you!',
        default: 'Thank You!',
        case: 'words',
      })}
    </p>
  </div>
)

class Redirecter extends Component {
  static propTypes = {
    redirect: PropTypes.func,
  }
  static defaultProps = {
    redirect: () => {},
  }
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.props.redirect()
  }

  render() {
    return (
      <div style={{ backgroundColor: '#fff', height: '100vh' }}>
        {intl.translate({
          key: 'redirecting',
          default: 'Redirecting',
          case: 'first',
        })}
        ...
      </div>
    )
  }
}
export class AppFrontController extends Component {
  static propTypes = {
    properties: PropTypes.object.isRequired,
    warnings: PropTypes.object.isRequired,
    splitWindowPath: PropTypes.array.isRequired,
    windowPath: PropTypes.string.isRequired,
    pushWindowPath: PropTypes.func.isRequired,
    replaceWindowPath: PropTypes.func.isRequired,
    computeLogin: PropTypes.object.isRequired,
    computeDialect2: PropTypes.object.isRequired,
    changeTheme: PropTypes.func.isRequired,
    // loadGuide: PropTypes.func.isRequired,
    // loadNavigation: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.state = this._getInitialState()

    // Bind methods to 'this'
    ;['_route', '_updateTitle'].forEach((method) => (this[method] = this[method].bind(this)))
  }

  _getInitialState() {
    const routes = Immutable.fromJS(ConfRoutes)
    const contextPath = ConfGlobal.contextPath.split('/').filter((v) => v !== '')

    return {
      routes:
        contextPath && contextPath.length > 0
          ? routes.map((route) => (route ? route.set('path', List(contextPath).concat(route.get('path'))) : route))
          : routes,
      matchedPage: null,
      matchedRouteParams: {},
      warningsDismissed: false,
    }
  }

  /**
   * Dynamically update title
   */
  _updateTitle() {
    // Title provided from within a component
    const pageTitleParams = this.props.properties.pageTitleParams

    let title = this.props.properties.title

    if (
      this.state.matchedPage &&
      this.state.matchedPage.has('title') &&
      this.state.matchedPage.get('title') &&
      this.state.matchedPage.get('title') !== document.title
    ) {
      const combinedRouteParams = Object.assign({}, this.state.matchedRouteParams, pageTitleParams)

      title = this.state.matchedPage.get('title')
      Object.keys(combinedRouteParams).forEach((route) => {
        title = title.replace('{$' + route + '}', StringHelpers.toTitleCase(combinedRouteParams[route]))
      })

      title = title + ' | ' + this.props.properties.title
    }

    if (title.search(' | ') >= 0) {
      const newTitle = []

      const parts = title.split('|')

      let i
      for (i in parts) {
        newTitle.push(intl.searchAndReplace(parts[i].trim()))
      }
      title = newTitle.join(' | ')
    }

    document.title = title
  }

  /**
   * Conditionally route the parameters.
   * This could normally go into the render method to keep things simple,
   * however redirecting (i.e. updating state), cannot be done inside render.
   */
  _route(props, routesOverride = null) {
    let matchedPage = null
    let matchedRouteParams = {}

    const pathArray = props.splitWindowPath

    const routes = routesOverride || this.state.routes

    routes.forEach((value) => {
      const matchTest = matchPath(value.get('path'), pathArray)
      const matchAlias = matchPath(value.get('alias'), pathArray)

      if (matchTest.matched || matchAlias.matched) {
        const routeParams = matchTest.routeParams

        // Extract common paths from URL
        if (value.has('extractPaths') && value.get('extractPaths')) {
          const domainPathLocation = pathArray.indexOf(ConfGlobal.domain)
          const dialectPathLocation = 5
          const languagePathLocation = 4
          const languageFamilyPathLocation = 3

          // If domain is specified in the URL, these are Nuxeo paths that can be extracted
          if (domainPathLocation !== -1) {
            // Path from domain to end of path (e.g. /FV/Workspaces/Data/family/language/dialect)
            const nuxeoPath = pathArray.slice(domainPathLocation, pathArray.length)

            if (nuxeoPath.length >= dialectPathLocation) {
              routeParams.dialect_name = decodeURI(nuxeoPath[dialectPathLocation])
              routeParams.dialect_path = decodeURI('/' + nuxeoPath.slice(0, dialectPathLocation + 1).join('/'))
            }

            if (nuxeoPath.length >= languagePathLocation) {
              routeParams.language_name = decodeURI(nuxeoPath[languagePathLocation])
              routeParams.language_path = decodeURI('/' + nuxeoPath.slice(0, languagePathLocation + 1).join('/'))
            }

            if (nuxeoPath.length >= languageFamilyPathLocation) {
              routeParams.language_family_name = decodeURI(nuxeoPath[languageFamilyPathLocation])
              routeParams.language_family_path = decodeURI(
                '/' + nuxeoPath.slice(0, languageFamilyPathLocation + 1).join('/')
              )
            }
          }
        }

        matchedPage = value
        matchedRouteParams = routeParams

        // Break out of forEach
        return false
      }
    })

    // Match found
    if (matchedPage !== null) {
      // Redirect if required
      if (matchedPage.has('redirects')) {
        matchedPage.get('redirects').forEach((value) => {
          if (value.get('condition')({ props: props })) {
            // Avoid invariant violations during rendering by setting temporary placeholder component as matched page, and 'redirecting' after mount.
            matchedPage = matchedPage.set(
              'page',
              Immutable.fromJS(
                React.createElement(
                  Redirecter,
                  {
                    redirect: () => {
                      return props.replaceWindowPath(value.get('target')({ props: props }))
                    },
                  },
                  matchedPage.get('page')
                )
              )
            )

            return false
          }
        })
      }

      // Switch themes based on route params
      if (matchedRouteParams.hasOwnProperty('theme')) {
        let newTheme = matchedRouteParams.theme

        // Switch to workspace theme if available
        if (
          ((matchedRouteParams.hasOwnProperty('area') && matchedRouteParams.area === 'Workspaces') ||
            matchedPage.get('path').indexOf('Workspaces') !== -1) &&
          matchedRouteParams.theme === 'explore'
        ) {
          newTheme = 'workspace'
        }

        if (props.properties.theme.id !== newTheme) {
          props.changeTheme(newTheme)
        }
      } else {
        props.changeTheme('default')
      }

      const matchReturn = {
        matchedPage: matchedPage,
        matchedRouteParams: matchedRouteParams,
      }

      // Load help
      //props.loadGuide(props.windowPath, matchReturn);

      // Load Navigation
      //props.loadNavigation();

      this.setState(matchReturn)
    } else {
      // No match found (i.e. 404)
      const notFoundPage = Immutable.fromJS({
        title: PAGE_NOT_FOUND_TITLE,
        page: <PageError title={PAGE_NOT_FOUND_TITLE} body={PAGE_NOT_FOUND_BODY} />,
      })

      const matchReturn = {
        matchedPage: notFoundPage,
        matchedRouteParams: matchedRouteParams,
      }

      this.setState(matchReturn)
    }
  }

  componentWillMount() {
    this._route(this.props)
  }

  componentDidUpdate(prevProps) {
    this._updateTitle()

    if (prevProps.windowPath !== this.props.windowPath) {
      // Track page view
      if (window.snowplow) {
        window.snowplow('trackPageView')
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // Re-route on window path change
    if (nextProps.windowPath !== this.props.windowPath) {
      this._route(nextProps)
    } else if (nextProps.computeLogin !== this.props.computeLogin) {
      // Re-route on login
      this._route(nextProps)
    }
  }
  _renderWithBreadcrumb(reactElement, matchedPage, props, theme) {
    const themePalette = props.properties.theme.palette.rawTheme.palette
    const { routeParams } = reactElement.props
    const { splitWindowPath, computeLogin } = props
    const { routes } = this.state
    let _workspaceSwitcher = null
    const area = selectn('routeParams.area', reactElement.props)
    if (
      area &&
      selectn('isConnected', computeLogin) &&
      matchedPage.get('disableWorkspaceSectionNav') !== true &&
      !ProviderHelpers.isSiteMember(selectn('response.properties.groups', computeLogin))
    ) {
      _workspaceSwitcher = <WorkspaceSwitcher area={area} />
    }
    const overrideBreadcrumbs = selectn('props.properties.breadcrumbs', this)
    const findReplace = overrideBreadcrumbs
      ? { find: overrideBreadcrumbs.find, replace: selectn(overrideBreadcrumbs.replace, this.props.properties) }
      : undefined
    return (
      <div>
        <div className="breadcrumbContainer row">
          <div className="clearfix" style={{ backgroundColor: themePalette.accent4Color }}>
            {_workspaceSwitcher}
            <Breadcrumb
              className="pull-left"
              matchedPage={matchedPage}
              routes={routes}
              routeParams={routeParams}
              splitWindowPath={splitWindowPath}
              findReplace={findReplace}
            />
          </div>
        </div>
        <div className={'page-' + theme + '-theme'}>{reactElement}</div>
      </div>
    )
  }

  render() {
    const { matchedPage, matchedRouteParams } = this.state

    const isFrontPage = !matchedPage ? false : matchedPage.get('frontpage')
    const hideNavigation = matchedPage && matchedPage.has('navigation') && matchedPage.get('navigation') === false

    let page

    let navigation = <Navigation frontpage={isFrontPage} routeParams={matchedRouteParams} />
    const theme = matchedRouteParams.hasOwnProperty('theme') ? matchedRouteParams.theme : 'default'
    const print = matchedPage
      ? matchedPage
          .get('page')
          .get('props')
          .get('print') === true
      : false

    let footer = <Footer className={'footer-' + theme + '-theme'} />

    const clonedElement = React.cloneElement(matchedPage.get('page').toJS(), { routeParams: matchedRouteParams })

    // For print view return page only
    if (print) {
      return <div style={{ margin: '25px' }}>{clonedElement}</div>
    }

    // Remove breadcrumbs for Kids portal
    // TODO: Make more generic if additional themes are added in the future.
    if (theme === 'kids') {
      page = clonedElement
      navigation = <KidsNavigation frontpage={isFrontPage} routeParams={matchedRouteParams} />
    } else {
      // Without breadcrumbs
      if (matchedPage.get('breadcrumbs') === false) {
        page = clonedElement
      } else {
        // With breadcrumbs
        page = this._renderWithBreadcrumb(clonedElement, matchedPage, this.props, theme)
      }
    }

    // Hide navigation
    if (hideNavigation) {
      navigation = footer = ''
    }

    return (
      <div>
        {(matchedPage && matchedPage.hasOwnProperty('warnings') ? matchedPage.get('warnings') : []).map((warning) => {
          if (this.props.warnings.hasOwnProperty(warning) && !this.state.warningsDismissed) {
            return (
              <div
                style={{ position: 'fixed', bottom: 0, zIndex: 99999 }}
                className={classNames('alert', 'alert-warning')}
              >
                {selectn(warning, this.props.warnings)}
                <FlatButton
                  label={intl.translate({
                    key: 'dismiss',
                    default: 'Dismiss',
                    case: 'words',
                  })}
                  onClick={() => this.setState({ warningsDismissed: true })}
                />
              </div>
            )
          }
        })}

        <div id="pageNavigation" className="row">
          {navigation}
        </div>
        <div id="pageContainer">{page}</div>
        <div id="pageFooter" className="row">
          {footer}
        </div>
      </div>
    )
  }
}

export default provide(AppFrontController)
