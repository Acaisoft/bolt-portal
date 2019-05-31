import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import useStyles from './Details.styles'

export function Details({ match }) {
  const { sourceId } = match.params
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
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sourceId: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default Details
