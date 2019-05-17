import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles } from '@material-ui/core'

import styles from './Container.styles'

export function Container({ children, classes, className }) {
  return <div className={classnames(classes.root, className)}>{children}</div>
}
Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Container)
