import React from 'react'
import PropTypes from 'prop-types'

import { CssBaseline, withStyles } from '@material-ui/core'

import AuthorizedPages from '~pages/Authorized'

import TopBar from './components/TopBar'
import styles from './Authorized.styles'

export function Authorized({ classes }) {
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <CssBaseline />
        <TopBar />
      </div>
      <main className={classes.content}>
        <AuthorizedPages />
      </main>
    </div>
  )
}
Authorized.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Authorized)
