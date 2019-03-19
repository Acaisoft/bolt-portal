import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import ListPage from './List'
import DetailsPage from './Details'
import TestExecutionsPage from './TestExecutions'
import TestRepositoriesPage from './TestRepositories'
import TestConfigurationsPage from './TestConfigurations'

export function Projects({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}`} exact component={ListPage} />
      <Route
        path={`${match.url}/:projectId`}
        render={props => <ProjectSubpages {...props} rootUrl={match.url} />}
      />
      <Redirect from="*" to={match.url} />
    </Switch>
  )
}
Projects.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export function ProjectSubpages({ match, rootUrl }) {
  const { projectId } = match.params

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={props => <DetailsPage {...props} projectId={projectId} />}
      />
      <Route
        path={`${match.url}/test-execs`}
        render={props => <TestExecutionsPage {...props} projectId={projectId} />}
      />
      <Route
        path={`${match.url}/test-repositories`}
        render={props => <TestRepositoriesPage {...props} projectId={projectId} />}
      />
      <Route
        path={`${match.url}/test-configurations`}
        render={props => <TestConfigurationsPage {...props} projectId={projectId} />}
      />
    </Switch>
  )
}

export default Projects
