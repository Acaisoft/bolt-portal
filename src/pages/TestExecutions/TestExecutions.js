import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import ListPage from './List'
import DetailsPage from './Details'
import EndpointDetailsPage from './EndpointDetails'
import MonitoringPage from './Monitoring'

export function TestExecutions({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={ListPage} />
      <Route path={`${match.path}/:executionId`} exact component={DetailsPage} />
      <Route
        path={`${match.path}/:executionId/endpoint/:endpointId`}
        exact
        component={EndpointDetailsPage}
      />
      <Route
        path={`${match.path}/:executionId/monitoring`}
        exact
        component={MonitoringPage}
      />
      <Redirect from="*" to={match.url} />
    </Switch>
  )
}
TestExecutions.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default TestExecutions
