import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import RepositoriesPage from '~pages/Repositories'
import TestExecutionsPage from '~pages/TestExecutions'
import TestConfigurationsPage from '~pages/TestConfigurations'

import ListPage from './List'
import DetailsPage from './Details'

export function Projects({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={ListPage} />
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
      <Route path={`${match.path}/repositories`} component={RepositoriesPage} />
      <Route
        path={`${match.path}/test-configurations`}
        component={TestConfigurationsPage}
      />
    </Switch>
  )
}

export default Projects
