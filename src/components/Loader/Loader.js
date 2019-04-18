import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, withStyles } from '@material-ui/core'

import style from './Loader.styles'

export function Loader({ loading, children, ...rest }) {
  return loading ? <RenderLoader {...rest} /> : children
}

function RenderLoader({ fill, classes }) {
  const LoaderWithProps = function() {
    return <CircularProgress color="secondary" className={classes.root} />
  }
  return fill ? (
    <div className={classes.holder}>
      <LoaderWithProps />
    </div>
  ) : (
    <LoaderWithProps />
  )
}

Loader.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  fill: PropTypes.bool,
  classes: PropTypes.object,
}

export default withStyles(style)(Loader)
