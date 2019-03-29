import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Typography, withStyles } from '@material-ui/core'

import styles from './SectionHeader.styles'

function SectionHeader({
  classes,
  description,
  marginBottom = false,
  subtitle,
  title,
}) {
  return (
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
