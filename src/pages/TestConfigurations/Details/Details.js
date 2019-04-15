import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { generatePath } from 'react-router-dom'
import { Typography, withStyles, Button } from '@material-ui/core'
import { PlayArrow, CalendarToday } from '@material-ui/icons'
import { TestExecutionsList } from '~containers/lists'
import { TestConfiguration } from '~containers'

import styles from './Details.styles'

const testSourceProperties = {
  repository: ['name', 'url'],
  test_creator: ['name'],
}

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
          {({ data }) => {
            if (!data) return null
            const { test_source, configuration_type, name } = data
            const { source_type } = test_source
            return (
              <div className={classes.header}>
                {console.log(data)}
                <div className={classes.information}>
                  <Typography variant="body1">Name: {name}</Typography>
                  <Typography variant="body1">
                    Test type: {configuration_type.name}
                  </Typography>
                  <br />
                  <Typography variant="body1">Test source: {source_type}</Typography>
                  {testSourceProperties[source_type].map(property => (
                    <Typography key={property} variant="body2">
                      {property}: {test_source[source_type][property]}
                    </Typography>
                  ))}
                  <br />
                  <Typography variant="body1">Configuration parameters:</Typography>
                  {((data || {}).configuration_parameters || []).map(param => (
                    <Typography key={param.parameter_slug} variant="body2">
                      {param.parameter_slug}: {param.value}
                    </Typography>
                  ))}
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
            )
          }}
        </TestConfiguration>
        <div className={classes.tableContainer}>
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
