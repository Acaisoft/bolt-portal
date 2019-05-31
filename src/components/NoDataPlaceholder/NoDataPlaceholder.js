import React from 'react'
import PropTypes from 'prop-types'
import { Typography, CircularProgress } from '@material-ui/core'
import { NoData } from '~assets/icons'

import useStyles from './NoDataPlaceholder.styles'

export function NoDataPlaceholder({
  actions,

  description,
  label,
  height = '100%',
}) {
  const classes = useStyles()

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
  description: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
}

export default NoDataPlaceholder
