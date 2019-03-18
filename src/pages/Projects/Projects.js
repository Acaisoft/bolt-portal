import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { Redirect, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import styles from './Projects.styles'

import ListPage from './List'
import DetailsPage from './Details'
import TestExecutionsPage from './TestExecutions'
import TestRepositoriesPage from './TestRepositories'
import TestConfigurationsPage from './TestConfigurations'
import { GET_PROJECT_BY_SLUG_QUERY } from '~services/GraphQL/Queries'

const SingleProjectPage = ({ match, rootUrl }) => {
  return (
    <Query
      query={GET_PROJECT_BY_SLUG_QUERY}
      variables={{ projectSlug: match.params.projectSlug }}
      skip={!match.params.projectSlug}
      fetchPolicy="cache-first"
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading</p>

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

export class Projects extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { match } = this.props
    return (
      <div>
        <Switch>
          <Route path={`${match.url}`} exact component={ListPage} />
          <Route
            path={`${match.url}/:projectSlug`}
            render={props => <SingleProjectPage {...props} rootUrl={match.url} />}
          />

          <Redirect from="*" to={match.url} />
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles)(Projects)
