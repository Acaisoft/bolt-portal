import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Typography, withStyles, Grid } from '@material-ui/core'

import styles from './SectionHeader.styles'

const sizeVariants = {
  title: {
    large: 'h1',
    medium: 'h2',
    small: 'subtitle2',
  },
  subtitle: {
    large: 'h2',
    medium: 'h3',
    small: '',
  },
}

function SectionHeader({
  children,
  classes,
  description,
  marginBottom = false,
  size = 'medium',
  subtitle,
  title,
}) {
  return (
    <Grid container justify="space-between" alignItems="center" spacing={32}>
      <Grid item>
        <div
          className={classNames({
            [classes.marginBottom]: Boolean(marginBottom),
            [classes[size]]: true,
          })}
        >
          <div className={classes.titleContainer}>
            <div className={classes.title}>{title}</div>
            {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
          </div>
          {description && <div className={classes.description}>{description}</div>}
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default withStyles(styles)(SectionHeader)
