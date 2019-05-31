import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Grid } from '@material-ui/core'

import useStyles from './SectionHeader.styles'

function SectionHeader({
  children,
  className,
  description,
  marginBottom = false,
  size = 'medium',
  subtitle,
  title,
  ...containerProps
}) {
  const classes = useStyles()

  const gridProps = {
    alignItems: 'center',
    justify: 'space-between',
    spacing: 4,
    ...containerProps,
  }

  return (
    <Grid container className={className} {...gridProps}>
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
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  marginBottom: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default SectionHeader
