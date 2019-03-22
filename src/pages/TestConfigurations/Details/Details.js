import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'
import { TestExecutionsList } from '~containers/lists'

import styles from './Details.styles'

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        configurationId: PropTypes.string.isRequired,
      }).isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  handleExecutionDetails = execution => {
    const { history, match } = this.props
    const projectPrefix = match.params.projectId
      ? `/projects/${match.params.projectId}`
      : ''

    history.push(`${projectPrefix}/test-runs/${execution.id}`)
  }

  render() {
    const { classes, match } = this.props
    const { configurationId } = match.params

    return (
      <div className={classes.root}>
        <Typography variant="body2">Here you see all test scenarios</Typography>
        <div className={classes.tableContainer}>
          Test Configuration details for {configurationId}
          <TestExecutionsList
            configurationId={configurationId}
            onDetails={this.handleExecutionDetails}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
