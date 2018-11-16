import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Paper, withStyles } from '@material-ui/core'

import styles from './Dashboard.styles'

export class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { classes, match } = this.props

    return (
      <Paper className={classes.root}>Dashboard page available at {match.url}</Paper>
    )
  }
}

export default withStyles(styles)(Dashboard)
