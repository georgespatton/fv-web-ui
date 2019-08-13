import React, { Component, PropTypes } from 'react'
// import Immutable, { List, Map } from 'immutable'
import selectn from 'selectn'
import { SECTIONS } from 'common/Constants'
export default class AuthenticationFilter extends Component {
  static propTypes = {
    children: PropTypes.node,
    hideFromSections: PropTypes.bool,
    containerStyle: PropTypes.object,
    login: PropTypes.object.isRequired,
    notAuthenticatedComponent: PropTypes.node,
    routeParams: PropTypes.object,
    anon: PropTypes.bool,
    sections: PropTypes.bool,
  }

  static defaultProps = {
    hideFromSections: false,
    anon: false,
    notAuthenticatedComponent: null,
  }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { children, login, anon, hideFromSections, routeParams, containerStyle /*, ...other*/ } = this.props

    const isSection = selectn('area', routeParams) === SECTIONS

    const comonentToRender = <div style={containerStyle}>{children}</div>

    // If anonymous allowed, render
    if (anon) {
      return comonentToRender
    }

    // Logged in user.
    if (login.success && login.isConnected) {
      // Hide from sections for logged in user as well.
      if (hideFromSections && isSection) {
        return null
      }

      return comonentToRender
    }

    return this.props.notAuthenticatedComponent
  }
}
