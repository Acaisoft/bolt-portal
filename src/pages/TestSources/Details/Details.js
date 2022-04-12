import React from 'react'
import { useParams } from 'react-router-dom'

import { Typography } from '@material-ui/core'

import useStyles from './Details.styles'

export function Details() {
  const { sourceId } = useParams()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="body2">Here you see test source details</Typography>
      <div className={classes.tableContainer}>
        Test source details for {sourceId}
      </div>
    </div>
  )
}

export default Details
