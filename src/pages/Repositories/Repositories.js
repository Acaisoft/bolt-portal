import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import CreatePage from './Create'
import DetailsPage from './Details'
import ListPage from './List'

export function Repositories({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={ListPage} />
      <Route path={`${match.path}/create`} exact component={CreatePage} />
      <Route path={`${match.path}/:repositoryId`} exact component={DetailsPage} />
      <Redirect from="*" to={match.url} />
    </Switch>
  )
}
Repositories.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default Repositories
