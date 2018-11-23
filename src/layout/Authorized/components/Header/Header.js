import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, withStyles } from '@material-ui/core'

import Nav from './components/Nav'
import UserInfo from './components/UserInfo'

import styles from './Header.styles'

export class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool,
  }

  render() {
    const { classes, isAuthorized } = this.props

    return (
      <AppBar
        position="static"
        color="default"
        elevation={1}
        classes={{ colorDefault: classes.AppBar }}
      >
        <Toolbar className={classes.Toolbar}>
          <Link to="/" className={classes.brand}>
            React Seed
          </Link>
          <Nav isAuthorized={isAuthorized} />
          <UserInfo isAuthorized={isAuthorized} />
        </Toolbar>
      </AppBar>
    )
  }
}

const mapState = state => ({
  isAuthorized: true, // @TODO: e.g. state.auth.isAuthorized,
})

export default withRouter(connect(mapState)(withStyles(styles)(Header)))
