import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CssBaseline, withStyles } from '@material-ui/core'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import AuthorizedPages from '~pages/Authorized'

import styles from './Authorized.styles'

export class Authorized extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.nav}>
          <CssBaseline />
          <Header />
          <Sidebar />
        </div>
        <main className={classes.content}>
          <AuthorizedPages />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Authorized)
