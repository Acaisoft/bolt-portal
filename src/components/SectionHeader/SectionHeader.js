import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Typography, withStyles, Grid } from '@material-ui/core'

import styles from './SectionHeader.styles'

function SectionHeader({
  children,
  classes,
  description,
  marginBottom = false,
  subtitle,
  title,
}) {
  return (
    <Grid container justify="space-between" alignItems="center" spacing={32}>
      <Grid item>
        <div className={classNames({ [classes.marginBottom]: marginBottom })}>
          <div>
            <Typography variant="h2" className={classes.title} inline>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="h3" className={classes.subtitle} inline>
                {subtitle}
              </Typography>
            )}
          </div>
          {description && (
            <Typography variant="subtitle2" className={classes.description}>
              {description}
            </Typography>
          )}
        </div>
      </Grid>
      {children && (
        <Grid item>
          <Grid container justify="flex-end" alignItems="center">
            {children}
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
SectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  marginBottom: PropTypes.bool,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default withStyles(styles)(SectionHeader)
