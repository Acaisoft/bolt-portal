import React from 'react'

import useStyles from './ChartTooltip.styles'
import { Paper } from '@material-ui/core'

const identity = x => x

function ChartTooltip({
  active,
  formatter = identity,
  label,
  labelFormatter = identity,
  payload,
}) {
  const classes = useStyles()

  if (!payload) {
    return null
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <div className={classes.label}>{labelFormatter(label)}</div>
      <ul className={classes.list}>
        {payload.map(item => (
          <li key={item.name} className={classes.item}>
            <div
              className={classes.itemColor}
              style={{ backgroundColor: item.color }}
            />
            <div className={classes.itemName}>{item.name}</div>
            <div className={classes.itemValue}>{formatter(item.value)}</div>
          </li>
        ))}
      </ul>
    </Paper>
  )
}

export default ChartTooltip
