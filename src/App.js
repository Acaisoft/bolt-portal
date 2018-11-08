import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Layout from '~layout/Layout'
import withMuiTheme from '~layout/withMuiTheme'

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
  }
}

export default withMuiTheme(App)
