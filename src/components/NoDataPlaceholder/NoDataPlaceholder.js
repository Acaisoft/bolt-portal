import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles, CircularProgress } from '@material-ui/core'
import { NoData } from '~assets/icons'

import styles from './NoDataPlaceholder.styles'

export function NoDataPlaceholder({ actions, classes, description, label, height }) {
  return (
    <div className={classes.root} style={{ height }} data-testid="no-data-container">
      <NoData className={classes.icon} />
      <div className={classes.titleHolder}>
        <CircularProgress
          color="primary"
          className={classes.progress}
          data-testid="circular-progress-spinner"
          size={22}
        />
        <Typography className={classes.title} variant="body1">
          {label}
        </Typography>
      </div>
      {description && (
        <Typography className={classes.description} variant="body2">
          {description}
        </Typography>
      )}
      {actions && actions}
    </div>
  )
}

NoDataPlaceholder.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  classes: PropTypes.object,
  description: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(NoDataPlaceholder)
