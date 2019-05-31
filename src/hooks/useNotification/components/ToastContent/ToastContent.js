import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

import useStyles from './ToastContent.style'

export function ToastContent({ message, title, IconComponent }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {IconComponent && (
        <div>
          <IconComponent
            className={classes.icon}
            data-testid="toast-content-icon-component"
          />
        </div>
      )}
      <div>
        {title && (
          <Typography className={classes.title} variant="h1">
            {title}
          </Typography>
        )}
        <Typography className={classes.subtitle} variant="h2">
          {message}
        </Typography>
      </div>
    </div>
  )
}

ToastContent.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  IconComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}

export default ToastContent
