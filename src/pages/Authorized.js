import React, { Component } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import DashboardPage from './Dashboard'
import ProjectsPage from './Projects'

export class Authorized extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    )
  }
}

export default Authorized
