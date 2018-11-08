import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import styles from './Guest.styles'

export class Guest extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return <div className={classes.root}>Guest Routes</div>
  }
}

export default withRouter(withStyles(styles)(Guest))
