import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import ListPage from './List'
import DetailsPage from './Details'

export function TestExecutions({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}`} exact component={ListPage} />
      <Route path={`${match.url}/:executionId`} exact component={DetailsPage} />
      <Redirect from="*" to={match.url} />
    </Switch>
  )
}
TestExecutions.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default TestExecutions
