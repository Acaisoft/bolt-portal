import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import TestExecutionsPage from '~pages/TestExecutions'
import ListPage from './List'
import DetailsPage from './Details'
import CreateOrEditPage from './CreateOrEdit'

export function TestConfigurations({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={ListPage} />
      <Route path={`${match.path}/create`} exact component={CreateOrEditPage} />
      <Route
        path={`${match.path}/:configurationId`}
        component={ConfigurationSubpages}
      />
      <Redirect from="*" to={match.url} />
    </Switch>
  )
}
TestConfigurations.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

function ConfigurationSubpages({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={DetailsPage} />
      <Route path={`${match.path}/test-runs`} component={TestExecutionsPage} />
    </Switch>
  )
}

export default TestConfigurations
