import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { IconButton, Menu, MenuItem, withStyles } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import styles from './UserInfo.styles'

export class UserInfo extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  }

  handlers = {}

  state = {
    anchor: null,
  }

  render() {
    const { classes } = this.props
    const { anchor } = this.state
    const isOpen = !!anchor

    return (
      <div className={classes.root}>
        <IconButton
          aria-owns={isOpen ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuLink('/products')}>Products</MenuItem>
          <MenuItem onClick={this.handleMenuLink('/jobs')}>Jobs</MenuItem>
          <MenuItem onClick={this.handleMenuLink('/profiles')}>Profiles</MenuItem>
          <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
        </Menu>
      </div>
    )
  }

  handleMenuOpen = event => {
    this.setState({ anchor: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchor: null })
  }

  // Cache generated handlers to prevent redundant re-renders.
  handleMenuLink = route => {
    if (typeof this.handlers[route] !== 'function') {
      const { history } = this.props
      const handler = () => {
        history.push(route)
        this.handleMenuClose()
      }
      this.handlers[route] = handler
    }

    return this.handlers[route]
  }

  handleLogout = () => {
    this.props.logout()
  }
}

const mapDispatch = () => ({
  logout: () => {},
})

export default withRouter(
  connect(
    null,
    mapDispatch
  )(withStyles(styles)(UserInfo))
)
