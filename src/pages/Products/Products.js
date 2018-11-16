import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'

import CreateEditPage from './CreateEdit'
import DetailsPage from './Details'
import ListPage from './List'

export class Products extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { match } = this.props

    return (
      <div>
        <div>Products</div>
        <Switch>
          <Route path={`${match.url}/:id/details`} component={DetailsPage} />
          <Route path={`${match.url}/:id/edit`} component={CreateEditPage} />
          <Route path={`${match.url}/create`} component={CreateEditPage} />
          <Route path={`${match.url}`} component={ListPage} />
          <Redirect from="*" to={match.url} />
        </Switch>
      </div>
    )
  }
}

export default Products
