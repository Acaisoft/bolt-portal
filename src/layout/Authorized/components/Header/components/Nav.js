import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { Button, withStyles } from '@material-ui/core'

import styles from './Nav.styles'

export class Nav extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  items = [
    { label: 'Dashboard', linkTo: '/dashboard' },
    { label: 'Products', linkTo: '/products' },
    { label: 'Jobs', linkTo: '/jobs' },
  ]

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.items.map(({ linkTo, label, ...other }) => (
          <Button
            key={linkTo}
            component={NavLink}
            color="inherit"
            className={classes.button}
            to={linkTo}
            activeClassName={classes.active}
            {...other}
          >
            {label}
          </Button>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(Nav)
