import React, { Component } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import ProjectsPage from './Projects'

export class Authorized extends Component {
  render() {
    return (
      <Switch>
        <Route path="/projects" component={ProjectsPage} />
        <Redirect from="*" to="/projects" />
      </Switch>
    )
  }
}

export default Authorized
