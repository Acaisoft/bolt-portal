import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Redirect, Route, Switch } from 'react-router-dom'

import styles from './Projects.styles'

import ListPage from './List'
import DetailsPage from './Details'
import TestExecutionsPage from './TestExecutions'
import TestRepositoriesPage from './TestRepositories'

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
          <Route path={`${match.url}/:id`} exact component={DetailsPage} />
          <Route
            path={`${match.url}/:id/test-execs`}
            component={TestExecutionsPage}
          />
          <Route
            path={`${match.url}/:id/test-repositories`}
            component={TestRepositoriesPage}
          />
          <Redirect from="*" to={match.url} />
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles)(Projects)
