import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'
import Header from './components/Header'

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
        <Header />
        <main className={classes.content}>
          <div>Authorized routes</div>
          <AuthorizedPages />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Authorized)
