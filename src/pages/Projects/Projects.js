import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import TestConfigurationsPage from '~pages/TestConfigurations'
import TestExecutionsPage from '~pages/TestExecutions'
import TestSourcesPage from '~pages/TestSources'

import ListPage from './List'
import DetailsPage from './Details'

export function Projects({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} strict={false} exact component={ListPage} />
      <Route path={`${match.path}/:projectId`} component={ProjectSubpages} />
      <Redirect from="*" to={match.url} />
    </Switch>
  )
}
Projects.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export function ProjectSubpages({ match, rootUrl }) {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={DetailsPage} />
      <Route path={`${match.path}/test-runs`} component={TestExecutionsPage} />
      <Route path={`${match.path}/test-sources`} component={TestSourcesPage} />
      <Route
        path={`${match.path}/test-configurations`}
        component={TestConfigurationsPage}
      />
    </Switch>
  )
}

export default Projects
