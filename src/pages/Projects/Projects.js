import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { Redirect, Route, Switch } from 'react-router-dom'

import ListPage from './List'
import DetailsPage from './Details'
import TestExecutionsPage from './TestExecutions'
import TestRepositoriesPage from './TestRepositories'
import TestConfigurationsPage from './TestConfigurations'

import { GET_PROJECT_BY_SLUG_QUERY } from '~services/GraphQL/Queries'

export function Projects({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}`} exact component={ListPage} />
      <Route
        path={`${match.url}/:projectSlug`}
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
  return (
    <Query
      query={GET_PROJECT_BY_SLUG_QUERY}
      variables={{ projectSlug: match.params.projectSlug }}
      fetchPolicy="cache-first"
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>

        if (data.project.length === 0) return <Redirect to={rootUrl} />

        const projectId = data.project[0].id

        return (
          <Switch>
            <Route
              exact
              path={`${match.url}`}
              render={props => <DetailsPage {...props} projectId={projectId} />}
            />
            <Route
              path={`${match.url}/test-execs`}
              render={props => (
                <TestExecutionsPage {...props} projectId={projectId} />
              )}
            />
            <Route
              path={`${match.url}/test-repositories`}
              render={props => (
                <TestRepositoriesPage {...props} projectId={projectId} />
              )}
            />
            <Route
              path={`${match.url}/test-configurations`}
              render={props => (
                <TestConfigurationsPage {...props} projectId={projectId} />
              )}
            />
          </Switch>
        )
      }}
    </Query>
  )
}

export default Projects
