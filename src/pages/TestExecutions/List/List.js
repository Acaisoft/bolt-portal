import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'
import { TestExecutionsList } from '~containers'

import styles from './List.styles'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in all of your projects
        </Typography>
        <div className={classes.tableContainer}>
          <TestExecutionsList />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(List)
