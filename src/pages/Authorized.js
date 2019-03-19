import React, { Component } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import DashboardPage from './Dashboard'
import ProjectsPage from './Projects'
import TestConfigurationsPage from './TestConfigurations'
import TestExecutionsPage from './TestExecutions'

export class Authorized extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/test-configurations" component={TestConfigurationsPage} />
        <Route path="/test-runs" component={TestExecutionsPage} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    )
  }
}

export default Authorized
