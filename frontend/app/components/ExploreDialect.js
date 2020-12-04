/* global _paq */
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
import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import Immutable from 'immutable'

import classNames from 'classnames'
import { WORKSPACES, SECTIONS } from 'common/Constants'

import useIntl from 'dataSources/useIntl'
import useDialect from 'dataSources/useDialect'
import useRoute from 'dataSources/useRoute'
import useLogin from 'dataSources/useLogin'
import useProperties from 'dataSources/useProperties'
import useWindowPath from 'dataSources/useWindowPath'
import usePortal from 'dataSources/usePortal'
import useCache from 'dataSources/useCache'

import selectn from 'selectn'

import ProviderHelpers from 'common/ProviderHelpers'
import NavigationHelpers from 'common/NavigationHelpers'
import PromiseWrapper from 'components/PromiseWrapper'
import EditableComponentHelper from 'components/EditableComponentHelper'
import Header from 'components/Header'
import { getDialectClassname } from 'common/Helpers'
import PageToolbar from 'components/PageToolbar'
import GridView from 'components/LearnBase/grid-view'
import TextHeader from 'components/Typography/text-header'
import AuthorizationFilter from 'components/AuthorizationFilter'
import Kids from 'components/Kids'
import FVLabel from 'components/FVLabel'
import FVButton from 'components/FVButton'

/**
 * Dialect portal page showing all the various components of this dialect.
 */
function ExploreDialect(props) {
  const { computeDialect2, fetchDialect2, republishDialect, updateDialect2 } = useDialect()
  const { clearCacheItem } = useCache()
  const { routeParams } = useRoute()
  const { computeLogin } = useLogin()
  const { intl } = useIntl()
  const { properties } = useProperties()
  const { windowPath, pushWindowPath } = useWindowPath()
  const { computePortal, cacheComputePortal, fetchPortal, updatePortal } = usePortal()
  const portalKey = `${routeParams.dialect_path}/Portal`
  useEffect(() => {
    fetchDialect2(routeParams.dialect_path)

    if (selectn('success', ProviderHelpers.getEntry(computePortal, portalKey, cacheComputePortal)) !== true) {
      fetchPortal(
        portalKey,
        intl.trans('views.pages.explore.dialect.fetching_community_portal', 'Fetching community portal.', 'first'),
        null,
        intl.trans(
          'views.pages.explore.dialect.problem_fetching_portal',
          'Problem fetching community portal it may be unpublished or offline.',
          'first'
        )
      )
    }
  }, [windowPath, routeParams])

  const _onNavigateRequest = (path, e) => {
    e.preventDefault()
    pushWindowPath(path)
  }

  /**
   * Publish changes
   */
  const _publishChangesAction = () => {
    republishDialect(
      routeParams.dialect_path,
      { value: 'Republish' },
      null,
      intl.trans(
        'views.pages.explore.dialect.portal_published_successfully',
        'Portal published successfully!',
        'first',
        [],
        null,
        '!'
      )
    )
    // After publishing we need to clear out the Redux cache value
    // The cache key uses the public location: `/FV/sections..` so
    // we need to replace Workspaces for sections in portalKey
    clearCacheItem({
      reducer: 'computePortal',
      id: portalKey.replace('Workspaces', 'sections'),
    })
  }

  const _handleSelectionChange = (itemId, item) => {
    NavigationHelpers.navigate(
      NavigationHelpers.generateUIDPath(routeParams.siteTheme, selectn('properties', item), 'words'),
      pushWindowPath,
      true
    )
  }

  const computeEntities = Immutable.fromJS([
    {
      id: routeParams.dialect_path,
      entity: computeDialect2,
    },
  ])

  let _computeDialect2 = ProviderHelpers.getEntry(computeDialect2, routeParams.dialect_path)
  let _computePortal = ProviderHelpers.getEntry(computePortal, portalKey, cacheComputePortal)

  const isSection = routeParams.area === SECTIONS
  const isKidsTheme = routeParams.siteTheme === 'kids'

  // Render kids view
  if (isKidsTheme && _computePortal) {
    return (
      <PromiseWrapper computeEntities={computeEntities}>
        <Kids {...props} portal={_computePortal} />
      </PromiseWrapper>
    )
  }

  const featuredWords = selectn('response.contextParameters.portal.fv-portal:featured_words', _computePortal) || []

  /**
   * Suppress Editing for Language Recorders with Approvers
   */
  const roles = selectn('response.contextParameters.dialect.roles', _computeDialect2)

  if (roles && roles.indexOf('Manage') === -1) {
    _computeDialect2 = Object.assign(_computeDialect2, {
      response: Object.assign(_computeDialect2.response, {
        contextParameters: Object.assign(_computeDialect2.response.contextParameters, { permissions: ['Read'] }),
      }),
    })
  }

  const portalRoles = selectn('response.contextParameters.portal.roles', _computePortal)
  const portalPermissions = selectn('response.contextParameters.portal.permissions', _computePortal)

  // if we have roles and no permissions
  if (portalRoles && !portalPermissions) {
    // we have the manage role, but no permissions
    if (portalRoles.indexOf('Manage') >= 0) {
      // update the permissions
      _computePortal = Object.assign(_computePortal, {
        response: Object.assign(_computePortal.response, {
          contextParameters: Object.assign(_computePortal.response.contextParameters, {
            permissions: ['Read', 'Write', 'Everything'],
          }),
        }),
      })
    }
  }
  const dialectClassName = getDialectClassname(_computeDialect2)
  let toolbar = null
  if (routeParams.area === WORKSPACES) {
    if (selectn('response', _computeDialect2)) {
      toolbar = (
        <PageToolbar
          label={intl.trans('portal', 'Portal', 'first')}
          handleNavigateRequest={_onNavigateRequest}
          computeEntity={_computeDialect2}
          computeLogin={computeLogin}
          actions={['dialect', 'edit', 'publish', 'more-options']}
          publishChangesAction={_publishChangesAction}
          {...props}
        />
      )
    }
  }
  let portalTitle = null
  if (
    selectn('isConnected', computeLogin) ||
    selectn('response.properties.fv-portal:greeting', _computePortal) ||
    selectn('response.contextParameters.portal.fv-portal:featured_audio', _computePortal)
  ) {
    const portalTitleAudio = selectn('response.contextParameters.portal.fv-portal:featured_audio', _computePortal) ? (
      <audio
        id="portalFeaturedAudio"
        src={
          NavigationHelpers.getBaseURL() +
          selectn('response.contextParameters.portal.fv-portal:featured_audio', _computePortal).path
        }
        controls
      />
    ) : (
      ''
    )

    portalTitle = (
      <h1 className={classNames('display', 'dialect-greeting-container', dialectClassName)}>
        <AuthorizationFilter
          filter={{ permission: 'Write', entity: selectn('response', _computeDialect2) }}
          renderPartial
        >
          <EditableComponentHelper
            dataTestid="EditableComponent__fv-portal-greeting"
            className="fv-portal-greeting"
            isSection={isSection}
            computeEntity={_computePortal}
            updateEntity={updatePortal}
            property="fv-portal:greeting"
            entity={selectn('response', _computePortal)}
          />
        </AuthorizationFilter>

        {portalTitleAudio}
      </h1>
    )
  }
  let editableNews = null
  if (!isSection || selectn('response.properties.fv-portal:news', _computePortal)) {
    editableNews = (
      <AuthorizationFilter
        filter={{ permission: 'Write', entity: selectn('response', _computeDialect2) }}
        renderPartial
      >
        <div>
          <h3>
            <FVLabel transKey="news" defaultStr="News" transform="first" />
          </h3>
          <EditableComponentHelper
            dataTestid="EditableComponent__fv-portal-news"
            isSection={isSection}
            computeEntity={_computePortal}
            updateEntity={updatePortal}
            property="fv-portal:news"
            entity={selectn('response', _computePortal)}
          />
        </div>
      </AuthorizationFilter>
    )
  }
  const useBerrySource =
    selectn('response.contextParameters.ancestry.dialect.dc:title', _computePortal) || window.location.pathname
  return (
    <PromiseWrapper computeEntities={computeEntities}>
      <div className="row">{toolbar}</div>
      <Header
        dialect={{ compute: _computeDialect2, update: updateDialect2 }}
        portal={{ compute: _computePortal, update: updatePortal }}
        routeParams={routeParams}
      >
        <div className="dialect-navigation">
          <div className="row">
            <div className="col-xs-12">
              <div float="left">
                <a href={windowPath + '/learn'} onClick={_onNavigateRequest.bind(this, windowPath + '/learn')}>
                  <FVLabel transKey="learn_our_lang" defaultStr="Learn our Language" />
                </a>
                <a href={windowPath + '/play'} onClick={_onNavigateRequest.bind(this, windowPath + '/play')}>
                  <FVLabel transKey="views.pages.explore.dialect.play_game" defaultStr="Play a Game" />
                </a>
                <a href={windowPath + '/gallery'} onClick={_onNavigateRequest.bind(this, windowPath + '/gallery')}>
                  <FVLabel transKey="views.pages.explore.dialect.photo_gallery" defaultStr="Photo Gallery" />
                </a>
                <a
                  href={windowPath + '/kids'}
                  onClick={_onNavigateRequest.bind(this, windowPath.replace('explore', 'kids'))}
                >
                  <FVLabel transKey="views.pages.explore.dialect.kids_portal" defaultStr="Kids Portal" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Header>

      <div className={classNames('row', 'dialect-body-container')} style={{ marginTop: '15px' }}>
        <div className={classNames('col-xs-12', 'col-md-7')}>
          <div>{portalTitle}</div>

          <div className={dialectClassName}>
            <TextHeader
              title={intl.trans('views.pages.explore.dialect.about_us', 'ABOUT US', 'upper')}
              tag="h2"
              properties={properties}
            />
            <AuthorizationFilter
              filter={{ permission: 'Write', entity: selectn('response', _computeDialect2) }}
              renderPartial
            >
              <EditableComponentHelper
                dataTestid="EditableComponent__fv-portal-about"
                className="fv-portal-about"
                isSection={isSection}
                computeEntity={_computePortal}
                updateEntity={updatePortal}
                property="fv-portal:about"
                entity={selectn('response', _computePortal)}
              />
            </AuthorizationFilter>
          </div>

          <div>{editableNews}</div>
        </div>

        <div className={classNames('col-xs-12', 'col-md-4', 'col-md-offset-1')}>
          <div className="row">
            <div
              className={classNames('col-xs-12')}
              style={{
                marginBottom: '20px',
              }}
            >
              <TextHeader tag="h2" title="Want to help us make FirstVoices better?" />
              <p style={{ marginBottom: '20px' }}>
                Take our 15 minute survey to be entered for a chance to win a $50 gift card.
              </p>
              <FVButton
                href={`https://app.useberry.com/t/5TqLdd1k/?source=${useBerrySource}`}
                onClick={() => {
                  if (typeof _paq !== 'undefined') {
                    _paq.push(['trackEvent', 'Survey', 'FV Site Redesign', 'Site', useBerrySource])
                  }
                }}
                variant="contained"
                color="secondary"
                style={{ color: '#fff' }}
              >
                Click here to get started!
              </FVButton>
            </div>
          </div>
          <div className="row">
            <div className={classNames('col-xs-12')}>
              {featuredWords.length > 0 ? (
                <TextHeader
                  tag="h2"
                  title={intl.trans('first_words', 'FIRST WORDS', 'upper')}
                  properties={properties}
                />
              ) : (
                ''
              )}

              <GridView
                action={_handleSelectionChange}
                cols={3}
                cellHeight={194}
                type="FVWord"
                className="grid-view-first-words"
                metadata={selectn('response', _computeDialect2)}
                items={featuredWords.map((word) => {
                  return {
                    contextParameters: {
                      word: {
                        related_pictures: [selectn('fv:related_pictures[0]', word)],
                        related_audio: [selectn('fv:related_audio[0]', word)],
                      },
                    },
                    properties: word,
                  }
                })}
              />
              <div>
                {(selectn('response.contextParameters.portal.fv-portal:related_links.length', _computePortal) > 0 ||
                  !isSection) && (
                  <AuthorizationFilter
                    filter={{ permission: 'Write', entity: selectn('response', _computePortal) }}
                    renderPartial
                  >
                    <div>
                      <TextHeader
                        tag="h2"
                        title={intl.trans('related_links', 'RELATED LINKS', 'upper')}
                        properties={properties}
                      />
                      <EditableComponentHelper
                        dataTestid="EditableComponent__fv-portal-related_links"
                        isSection={isSection}
                        computeEntity={_computePortal}
                        updateEntity={updatePortal}
                        context={_computeDialect2}
                        showPreview
                        previewType="FVLink"
                        property="fv-portal:related_links"
                        sectionProperty="contextParameters.portal.fv-portal:related_links"
                        entity={selectn('response', _computePortal)}
                      />
                    </div>
                  </AuthorizationFilter>
                )}
              </div>
            </div>

            <div className={classNames('col-xs-12')}>
              <TextHeader
                tag="h2"
                title={intl.trans('views.pages.explore.dialect.region_data', 'REGION DATA', 'upper')}
                properties={properties}
              />

              <div className={classNames('dialect-info-banner')}>
                <div>
                  <div className="dib-body-row">
                    <strong>
                      <FVLabel transKey="country" defaultStr="Country" />:{' '}
                    </strong>
                    <AuthorizationFilter
                      filter={{ permission: 'Write', entity: selectn('response', _computeDialect2) }}
                      renderPartial
                    >
                      <EditableComponentHelper
                        className="EditableComponent--inline"
                        dataTestid="EditableComponent__fv-dialect-country"
                        isSection={isSection}
                        computeEntity={_computeDialect2}
                        updateEntity={updateDialect2}
                        property="fvdialect:country"
                        entity={selectn('response', _computeDialect2)}
                      />
                    </AuthorizationFilter>
                  </div>
                  <div className="dib-body-row">
                    <strong>
                      <FVLabel transKey="region" defaultStr="Region" transform="first" />:{' '}
                    </strong>
                    <AuthorizationFilter
                      filter={{ permission: 'Write', entity: selectn('response', _computeDialect2) }}
                      renderPartial
                    >
                      <EditableComponentHelper
                        className="EditableComponent--inline"
                        dataTestid="EditableComponent__fv-dialect-region"
                        isSection={isSection}
                        computeEntity={_computeDialect2}
                        updateEntity={updateDialect2}
                        property="fvdialect:region"
                        entity={selectn('response', _computeDialect2)}
                      />
                    </AuthorizationFilter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PromiseWrapper>
  )
}

// const { array, func, object, string } = PropTypes
// ExploreDialect.propTypes = {
// }

export default ExploreDialect
