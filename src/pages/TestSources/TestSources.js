import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import CreateOrEditPage from './CreateOrEdit'
import DetailsPage from './Details'
import ListPage from './List'

export function TestSources({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={ListPage} />
      <Route path={`${match.path}/create`} exact component={CreateOrEditPage} />
      <Route path={`${match.path}/:sourceId`} component={SourceSubpages} />
      <Redirect from="*" to={match.url} />
    </Switch>
  )
}
TestSources.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

function SourceSubpages({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={DetailsPage} />
      <Route path={`${match.path}/edit`} exact component={CreateOrEditPage} />
    </Switch>
  )
}

export default TestSources
