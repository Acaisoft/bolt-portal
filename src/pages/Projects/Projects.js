import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'

import { Redirect, Route, Switch } from 'react-router-dom'

import styles from './Projects.styles'

import ListPage from './List'
import DetailsPage from './Details'
import TestExecutionsPage from './TestExecutions'
import TestRepositoriesPage from './TestRepositories'
import { CURRENT_PROJECT_QUERY } from '~services/GraphQL/Store'

export class Projects extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { match } = this.props
    return (
      <Query query={CURRENT_PROJECT_QUERY} fetchPolicy="cache-first">
        {({ data, client }) => {
          return (
            <div>
              <Switch>
                <Route path={`${match.url}`} exact component={ListPage} />
                <Route
                  path={`${match.url}/:id`}
                  exact
                  render={props => (
                    <DetailsPage {...props} projectId={data.currentProject} />
                  )}
                />
                <Route
                  path={`${match.url}/:id/test-execs`}
                  component={TestExecutionsPage}
                />
                <Route
                  path={`${match.url}/:id/test-repositories`}
                  render={props => (
                    <TestRepositoriesPage
                      {...props}
                      projectId={data.currentProject}
                    />
                  )}
                />
                <Redirect from="*" to={match.url} />
              </Switch>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(Projects)
