import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import GuestPages from '~pages/Guest'

import styles from './Guest.styles'

export class Guest extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div>
          <div>Guest Routes</div>
          <GuestPages />
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Guest))
