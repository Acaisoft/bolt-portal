import React from 'react'

import { withStyles } from '@material-ui/core'

import styles from './Loading.styles'

function Loading({ classes }) {
  return <div className={classes.root}>Loading...</div>
}

export default withStyles(styles)(Loading)
