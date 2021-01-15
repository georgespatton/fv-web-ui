import React from 'react'
// import PropTypes from 'prop-types'
import TestPresentation from 'components/Test/TestPresentation'
import TestData from 'components/Test/TestData'

/**
 * @summary TestContainer
 * @version 1.0.1
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function TestContainer() {
  return (
    <TestData>
      {(TestDataOutput) => {
        // TODO FW-Test
        // eslint-disable-next-line
        console.log('TestDataOutput', TestDataOutput)
        return <TestPresentation />
      }}
    </TestData>
  )
}
// PROPTYPES
// const { string } = PropTypes
TestContainer.propTypes = {
  //   something: string,
}

export default TestContainer
