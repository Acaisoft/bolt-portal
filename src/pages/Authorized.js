import React, { Component } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import DashboardPage from './Dashboard'
import ProductsPage from './Products'

export class Authorized extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/products" component={ProductsPage} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    )
  }
}

export default Authorized
