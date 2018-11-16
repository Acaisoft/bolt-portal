import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import Header from './components/Header'

import DashboardPage from '~pages/Dashboard'
import ProductsPage from '~pages/Products'

import styles from './Authorized.styles'

export class Authorized extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <div>Authorized routes</div>
          <Switch>
            <Route path="/dashboard" exact component={DashboardPage} />
            <Route path="/products" component={ProductsPage} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Authorized)
