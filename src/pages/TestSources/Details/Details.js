import React from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'

import styles from './Details.styles'

export function Details({ classes, match }) {
  const { sourceId } = match.params

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
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      sourceId: PropTypes.string,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(Details)
