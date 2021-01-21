import React from 'react'
import PropTypes from 'prop-types'
import './Hero.css'
/**
 * @summary HeroPresentation
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function HeroPresentation({ background, foreground, foregroundIcon }) {
  if (!background && !foreground && !foregroundIcon) {
    return null
  }
  const styles = background
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.67), rgba(0, 0, 0, 0.67)), url(${background})`,
      }
    : {}
  const withBG = 'text-white h-96'
  const withoutBG = 'text-gray-500 py-16 bg-gray-100'
  return (
    <section
      data-testid="HeroPresentation"
      className={`
      flex
      justify-center
      ${background ? withBG : withoutBG}
    `}
      style={styles}
    >
      {(foreground || foregroundIcon) && (
        <div
          data-testid="HeroPresentation__foreground"
          className={`
            flex
            flex-col
            flex-grow
            flex-initial
            font-bold
            items-center
            justify-center
            max-w-screen-xl
            px-8
            sm:flex-row
            sm:justify-start
            text-4xl
          `}
        >
          {foregroundIcon} {foreground}
        </div>
      )}
    </section>
  )
}
// PROPTYPES
const { node } = PropTypes
HeroPresentation.propTypes = {
  background: node,
  foreground: node,
  foregroundIcon: node,
}

export default HeroPresentation
