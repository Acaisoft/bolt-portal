import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import { AppBar, Toolbar, withStyles } from '@material-ui/core'

import styles from './Header.styles'

export class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Acai Bolt
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
