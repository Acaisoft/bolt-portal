import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'
import { TestExecutionsList } from '~containers/lists'

import styles from './Details.styles'

export class Details extends Component {
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
        <Typography variant="body2">Here you see all test scenarios</Typography>
        <div className={classes.tableContainer}>
          Test Configuration details for {match.params.configurationId}
          <TestExecutionsList configurationId={match.params.configurationId} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
