import React from 'react'

import { Typography, withStyles } from '@material-ui/core'
import { CloudOff } from '@material-ui/icons'

import styles from './NoDataPlaceholder.styles'

function NoDataPlaceholder({ children, classes, data, label }) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <Typography className={classes.root} variant="body2" color="secondary">
        <CloudOff className={classes.icon} />
        {label}
      </Typography>
    )
  }

  return children
}

export default withStyles(styles)(NoDataPlaceholder)
