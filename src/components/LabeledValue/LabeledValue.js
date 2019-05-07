import React from 'react'

import { withStyles } from '@material-ui/core'

import styles from './LabeledValue.styles'

function LabeledValue({ classes, label, value }) {
  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  )
}

export default withStyles(styles)(LabeledValue)
