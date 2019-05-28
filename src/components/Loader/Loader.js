import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, withStyles } from '@material-ui/core'

import style from './Loader.styles'

export function Loader({
  children,
  classes,
  color = 'primary',
  fill = false,
  loading = false,
}) {
  if (!loading) {
    return children
  }

  const loader = <CircularProgress color={color} className={classes.root} />

  return fill ? <div className={classes.holder}>{loader}</div> : loader
}

Loader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
  fill: PropTypes.bool,
  loading: PropTypes.bool,
}

export default withStyles(style)(Loader)
