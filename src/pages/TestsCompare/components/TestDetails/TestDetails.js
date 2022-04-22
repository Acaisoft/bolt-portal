import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import moment from 'moment'
import classNames from 'classnames'
import routes from 'config/routes'
import { getUrl } from 'utils/router'
import { ExpandablePanel, SectionHeader, TestConfigurationDetails } from 'components'
import {
  ResultsPerEndpoint,
  ResultsPerTick,
} from 'pages/TestExecutions/Details/components'
import useStyles from './TestDetails.styles'

function TestDetails({ titleStart, execution, className }) {
  const classes = useStyles()
  const { projectId } = useParams()

  const testDate = moment(execution.start || execution.start_locust).format(
    'YYYY-MM-DD HH:mm:ss'
  )

  const getEndpointDetailsUrl = useCallback(
    endpoint => {
      return getUrl(routes.projects.configurations.executions.endpoints.details, {
        projectId,
        configurationId: execution.configuration.id,
        executionId: execution.id,
        endpointId: endpoint.identifier,
      })
    },
    [projectId, execution]
  )

  return (
    <div className={classNames(classes.root, className)}>
      <SectionHeader title={`${titleStart}${testDate}`} />
      <div className={classes.configDetails}>
        <ExpandablePanel defaultExpanded={false} title="Scenario Details">
          <TestConfigurationDetails
            configuration={execution.configuration_snapshot}
          />
        </ExpandablePanel>
      </div>
      <Grid container spacing={2}>
        <ResultsPerTick classes={classes} execution={execution} hideZoom />
        <ResultsPerEndpoint
          classes={classes}
          getEndpointDetailsUrl={getEndpointDetailsUrl}
          execution={execution}
        />
      </Grid>
    </div>
  )
}

TestDetails.propTypes = {
  titleStart: PropTypes.string,
  hideZoom: PropTypes.bool,
  execution: PropTypes.object.isRequired,
}

export default TestDetails
