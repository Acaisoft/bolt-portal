import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Layout from 'layout/Layout'
import withMuiTheme from 'layout/withMuiTheme'

export function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default withMuiTheme(App)
