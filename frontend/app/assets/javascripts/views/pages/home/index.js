/*
Copyright 2016 First People's Cultural Council

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'

// REDUX
import { connect } from 'react-redux'
// REDUX: actions/dispatch/func
import { pushWindowPath } from 'providers/redux/reducers/windowPath'
import { queryPage } from 'providers/redux/reducers/fvPage'

import selectn from 'selectn'
import classNames from 'classnames'

import ProviderHelpers from 'common/ProviderHelpers'

import PromiseWrapper from 'views/components/Document/PromiseWrapper'
import RaisedButton from 'material-ui/lib/raised-button'

import IntroCardView from 'views/components/Browsing/intro-card-view'
import TextHeader from 'views/components/Document/Typography/text-header'

import { isMobile } from 'react-device-detect'
import IntlService from 'views/services/intl'
import NavigationHelpers from '../../../common/NavigationHelpers'

/**
 * Explore Archive page shows all the families in the archive
 */

const { func, object, string } = PropTypes
export class PageHome extends Component {
  static propTypes = {
    // REDUX: reducers/state
    computeLogin: object.isRequired,
    computePage: object.isRequired,
    properties: object.isRequired,
    windowPath: string.isRequired,
    // REDUX: actions/dispatch/func
    pushWindowPath: func.isRequired,
    queryPage: func.isRequired,
  }

  /*static contextTypes = {
        muiTheme: React.object.isRequired
    };*/

  intl = IntlService.instance

  constructor(props, context) {
    super(props, context)
    window.intl = this.intl

    this.state = {
      mapVisible: false,
      pagePath: '/' + this.props.properties.domain + '/sections/Site/Resources/',
      dialectsPath: '/' + this.props.properties.domain + '/sections/',
    }
    ;['_onNavigateRequest', '_getBlockByArea'].forEach((method) => (this[method] = this[method].bind(this)))
  }

  componentDidMount() {
    this.props.queryPage(this.state.pagePath, " AND fvpage:url LIKE '/home/'" + '&sortOrder=ASC' + '&sortBy=dc:title')

    //this.props.fetchPortals(this.state.dialectsPath, ' AND fv-portal:map_marker_coords IS NOT NULL');
  }

  _onNavigateRequest(path) {
    this.props.pushWindowPath(path)
  }

  _getBlockByArea(page, area) {
    return (selectn('fvpage:blocks', page) || []).filter((block) => {
      return block.area == area
    })
  }

  render() {
    let bgAlign = 'center'

    if (isMobile) {
      bgAlign = 'left'
    }

    const homePageStyle = {
      position: 'relative',
      minHeight: '155px',
      backgroundAttachment: 'fixed',
      background: 'transparent url("assets/images/fv-intro-background.jpg") bottom ' + bgAlign + ' no-repeat',
      backgroundSize: 'cover',
      boxShadow: 'inset 0px 64px 112px 0 rgba(0,0,0,0.6)',
      overflow: 'hidden',
    }

    const computeEntities = Immutable.fromJS([
      {
        id: this.state.pagePath,
        entity: this.props.computePage,
      } /*,    {      'id': this.state.dialectsPath,      'entity': this.props.computePortals    }*/,
    ])

    const computePage = ProviderHelpers.getEntry(this.props.computePage, this.state.pagePath)
    //const computePortals = ProviderHelpers.getEntry(this.props.computePortals, this.state.dialectsPath);

    const page = selectn('response.entries[0].properties', computePage)
    //const dialects = selectn('response.entries', computePortals);

    const primary1Color = selectn('theme.palette.baseTheme.palette.primary1Color', this.props.properties)
    const primary2Color = selectn('theme.palette.baseTheme.palette.primary2Color', this.props.properties)
    // const accent1Color = selectn('theme.palette.baseTheme.palette.accent1Color', this.props.properties)
    const alternateTextColor = selectn('theme.palette.baseTheme.palette.alternateTextColor', this.props.properties)
    const intl = this.intl

    return (
      <PromiseWrapper renderOnError computeEntities={computeEntities}>
        <div className="row" style={homePageStyle}>
          <div style={{ position: 'relative', height: '650px' }}>
            <div className={classNames('col-xs-12')} style={{ height: '100%' }}>
              <div
                style={{ position: 'absolute', left: '25px', top: '25px', width: '40%' }}
                className={classNames({ invisible: !this.state.mapVisible, 'hidden-xs': true })}
              >
                {/*return <Map dialects={dialects} />*/}
              </div>

              <div className="home-intro-block">
                <h1
                  className="display"
                  style={{
                    backgroundColor: 'rgba(180, 0, 0, 0.65)',
                    fontWeight: 500,
                  }}
                >
                  {this.intl.searchAndReplace(selectn('fvpage:blocks[0].title', page), {})}
                </h1>
                <div className={classNames('home-intro-p-cont', 'body')}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.intl.searchAndReplace(selectn('fvpage:blocks[0].text', page), {}),
                    }}
                  />
                </div>
                <div>
                  <RaisedButton
                    label={
                      this.intl.translate({
                        key: 'get_started!',
                        default: 'Get Started!',
                        case: 'words',
                      }) + '!'
                    }
                    primary
                    onClick={this._onNavigateRequest.bind(
                      this,
                      NavigationHelpers.generateStaticURL('/explore/FV/sections/Data/')
                    )}
                    style={{ marginRight: '10px', height: '50px' }}
                    labelColor={alternateTextColor}
                    labelStyle={{ fontSize: '1.34em' }}
                  />
                  <div className="hidden" style={{ display: 'inline-block' }}>
                    <RaisedButton
                      primary
                      label={this.intl.translate({
                        key: ['views', 'pages', 'home', 'language_map'],
                        default: 'Language Map',
                        case: 'words',
                      })}
                      onClick={() => this.setState({ mapVisible: !this.state.mapVisible })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames('row')} style={{ margin: '25px 0' }}>
          <div>
            {this._getBlockByArea(page, 1).map((block, i) => {
              return (
                <div key={i} className={classNames('col-xs-12')}>
                  <div className="body">
                    <h2 style={{ fontWeight: 500 }}>{intl.searchAndReplace(selectn('title', block))}</h2>
                    <p dangerouslySetInnerHTML={{ __html: intl.searchAndReplace(selectn('text', block)) }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={classNames('row')} style={{ margin: '25px 0' }}>
          {this._getBlockByArea(page, 2).length > 0 ? (
            <div className={classNames('col-xs-12')} style={{ marginBottom: '15px' }}>
              <TextHeader
                title={this.intl.translate({
                  key: ['views', 'pages', 'home', 'tools_and_resources'],
                  default: 'TOOLS &amp; RESOURCES',
                  case: 'words',
                })}
                properties={this.props.properties}
              />
            </div>
          ) : null}

          <div>
            {this._getBlockByArea(page, 2).map((block, i) => {
              return (
                <div key={i} className={classNames('col-xs-12', 'col-md-3')}>
                  <IntroCardView block={block} primary1Color={primary1Color} primary2Color={primary2Color} />
                </div>
              )
            })}
          </div>
        </div>

        <div className={classNames('row')} style={{ margin: '25px 0' }}>
          {this._getBlockByArea(page, 3).length > 0 ? (
            <div className={classNames('col-xs-12')} style={{ marginBottom: '15px' }}>
              <TextHeader
                title={this.intl.translate({
                  key: ['views', 'pages', 'home', 'news_and_updates'],
                  default: 'NEWS &amp; UPDATES',
                  case: 'words',
                })}
                properties={this.props.properties}
              />
            </div>
          ) : null}

          <div>
            {this._getBlockByArea(page, 3).map((block, i) => {
              return (
                <div key={i} className={classNames('col-xs-12', 'col-md-3')}>
                  <IntroCardView block={block} primary1Color={primary1Color} primary2Color={primary2Color} />
                </div>
              )
            })}
          </div>
        </div>

        <div className={classNames('row')} style={{ margin: '25px 0' }}>
          {this._getBlockByArea(page, 4).length > 0 ? (
            <div className={classNames('col-xs-12')} style={{ marginBottom: '15px' }}>
              <TextHeader
                title={this.intl.translate({
                  key: ['views', 'pages', 'home', 'compatibility'],
                  default: 'COMBATIBILITY',
                  case: 'words',
                })}
                properties={this.props.properties}
              />
            </div>
          ) : null}

          <div>
            {this._getBlockByArea(page, 4).map((block, i) => {
              return (
                <div key={i} className={classNames('col-xs-12')}>
                  <div className="body">
                    <h2 style={{ fontWeight: 500 }}>{this.intl.searchAndReplace(selectn('title', block))}</h2>
                    <p dangerouslySetInnerHTML={{ __html: this.intl.searchAndReplace(selectn('text', block)) }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </PromiseWrapper>
    )
  }
}

// REDUX: reducers/state
const mapStateToProps = (state /*, ownProps*/) => {
  const { fvPage, navigation, nuxeo, windowPath } = state

  const { properties } = navigation
  const { computeLogin } = nuxeo
  const { computePage } = fvPage
  const { _windowPath } = windowPath

  return {
    computeLogin,
    computePage,
    properties,
    windowPath: _windowPath,
  }
}

// REDUX: actions/dispatch/func
const mapDispatchToProps = {
  pushWindowPath,
  queryPage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHome)
