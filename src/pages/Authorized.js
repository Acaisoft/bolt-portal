import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import ProjectsPage from './Projects'

export function Authorized() {
  return (
    <Switch>
      <Route path="/projects" component={ProjectsPage} />
      <Redirect from="*" to="/projects" />
    </Switch>
  )
}

export default Authorized
