import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles } from '@material-ui/core'

import styles from './Container.styles'

export class Container extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { children, classes, className } = this.props

    return <div className={classnames(classes.root, className)}>{children}</div>
  }
}

export default withStyles(styles)(Container)
