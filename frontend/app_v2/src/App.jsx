import React from 'react'
import Header from 'components/Header'
import DialectHeader from 'components/DialectHeader'
import 'tailwindcss/tailwind.css'

function App() {
  return (
    <div className="AppV2">
      <Header.Container className="AppV2__header" />
      <DialectHeader.Container />
    </div>
  )
}

export default App
