import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from '@material-ui/core'

import useStyles from './Loader.styles'

export function Loader({
  children,
  color = 'primary',
  fill = false,
  loading = false,
}) {
  const classes = useStyles()

  if (!loading) {
    return children
  }

  const loader = (
    <CircularProgress color={color} className={classes.root} data-testid="loader" />
  )

  return fill ? <div className={classes.holder}>{loader}</div> : loader
}

Loader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
  fill: PropTypes.bool,
  loading: PropTypes.bool,
}

export default Loader
