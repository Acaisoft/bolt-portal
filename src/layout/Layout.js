import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import Authorized from './Authorized'
import Guest from './Guest'

import styles from './Layout.styles'

export class Layout extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isAuthorized: PropTypes.bool,
  }

  render() {
    const { classes, isAuthorized } = this.props

    return (
      <div className={classes.root}>{isAuthorized ? <Authorized /> : <Guest />}</div>
    )
  }
}

const mapState = state => ({
  isAuthorized: true, // @TODO: e.g. state.auth.isAuthorized,
})

export default withRouter(connect(mapState)(withStyles(styles)(Layout)))
