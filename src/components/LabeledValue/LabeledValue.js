import React from 'react'

import useStyles from './LabeledValue.styles'

function LabeledValue({ label, value }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  )
}

export default LabeledValue
