import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

import useStyles from './SectionPlaceholder.styles'

export function SectionPlaceholder({
  actions,
  description,
  title,
  height = '100%',
  topImage,
  icon,
}) {
  const classes = useStyles()

  return (
    <div className={classes.root} style={{ height }} data-testid="placeholder-root">
      {topImage && (
        <div className={classes.topImage} data-testid="top-image-container">
          {topImage}
        </div>
      )}

      <div className={classes.content}>
        <div className={classes.titleHolder}>
          {icon && (
            <div
              className={classes.variantIcon}
              data-testid="variant-icon-container"
            >
              {icon}
            </div>
          )}

          <Typography className={classes.title} variant="h6" component="h2">
            {title}
          </Typography>
        </div>

        {description && (
          <Typography className={classes.description} variant="body2">
            {description}
          </Typography>
        )}
      </div>

      {actions && <div className={classes.actions}>{actions}</div>}
    </div>
  )
}

SectionPlaceholder.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  description: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  topImage: PropTypes.node,
}

export default SectionPlaceholder
