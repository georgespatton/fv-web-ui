import React, {Suspense} from 'react'
import Header from 'components/Header'
import TestPresentation from 'app_v1/TestPresentation'
function App() {
  return (
    <div className="AppV2">
      <Suspense><TestPresentation /></Suspense>
      <Header.Container className="AppV2__header" />
    </div>
  )
}

export default App
