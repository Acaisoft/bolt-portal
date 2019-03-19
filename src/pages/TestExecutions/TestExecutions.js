import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'
import { TestExecutionsList } from '~containers'

import styles from './TestExecutions.styles'

export class TestExecutions extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { classes, match } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in all of your projects
        </Typography>
        <div className={classes.tableContainer}>
          <TestExecutionsList
            getDetailsUrl={execution => `${match.url}/${execution.id}`}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TestExecutions)
