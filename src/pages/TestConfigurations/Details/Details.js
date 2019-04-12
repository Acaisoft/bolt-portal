import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { generatePath } from 'react-router-dom'
import { Typography, withStyles, Button } from '@material-ui/core'
import { PlayArrow, CalendarToday } from '@material-ui/icons'
import { TestExecutionsList } from '~containers/lists'
import { TestConfiguration } from '~containers/TestConfiguration'

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

    history.push(
      generatePath('/projects/:projectId/test-runs/:executionId', {
        ...match.params,
        executionId: execution.id,
      })
    )
  }

  render() {
    const { classes, match } = this.props
    const { configurationId } = match.params

    return (
      <div className={classes.root}>
        <TestConfiguration configurationId={configurationId}>
          {({ data }) =>
            data ? (
              <div className={classes.header}>
                {console.log(data)}
                <div className={classes.information}>
                  <Typography variant="body2">Name: {data.name}</Typography>
                  <Typography variant="body2">
                    Test source: {data.test_source || 'No test source'}
                  </Typography>
                  <Typography variant="body2">
                    Test type: {data.configuration_type.name}
                  </Typography>
                </div>
                <div className={classes.actions}>
                  <div className={classes.buttonsHolder}>
                    <Button
                      classes={{
                        root: classes.actionButton,
                        label: classes.actionButtonLabel,
                      }}
                      variant="contained"
                    >
                      <PlayArrow />
                      <Typography variant="body2">Play</Typography>
                    </Button>
                    <Button
                      classes={{
                        root: classes.actionButton,
                        label: classes.actionButtonLabel,
                      }}
                      variant="contained"
                    >
                      <CalendarToday />
                      <Typography variant="body2">Play</Typography>
                    </Button>
                  </div>
                </div>
              </div>
            ) : null
          }
        </TestConfiguration>
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
