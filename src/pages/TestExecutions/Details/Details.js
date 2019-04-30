import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useQuery } from 'react-apollo-hooks'

import { generatePath, Link as RouterLink } from 'react-router-dom'
import { withStyles, Paper, Grid, Link } from '@material-ui/core'

import { Loader, SectionHeader, ZoomButton, NoDataPlaceholder } from '~components'
import { ChevronRight } from '@material-ui/icons'

import {
  RequestsChart,
  RequestsPerSecondChart,
  ResponseTimeChart,
  ResultsPerEndpointChart,
  UsersSpawnChart,
} from './components/charts'
import { ResponsesTable } from './components/tables'

import {
  GET_EXECUTION,
  GET_EXECUTION_RESULTS_PER_TICK,
  GET_EXECUTION_RESULTS_DISTRIBUTION,
} from './graphql'

import styles from './Details.styles'

export function Details({ classes, match }) {
  const { executionId } = match.params
  const [isZoomed, setIsZoomed] = useState(false)

  const getScenarioUrl = useCallback(configurationId => {
    return generatePath(
      '/projects/:projectId/test-configurations/:configurationId',
      { ...match.params, configurationId }
    )
  }, [])

  const { data: execution, loading: executionLoading } = useExecution(executionId)
  const { data: resultsPerTick, loading: resultsPerTickLoading } = useResultsPerTick(
    executionId
  )
  const {
    data: resultsPerEndpoint,
    loading: resultsPerEndpointLoading,
  } = useResultsPerEndpoint(executionId)

  if (executionLoading || resultsPerTickLoading || resultsPerEndpointLoading) {
    return <Loader loading fill />
  }

  const noDataMessage = 'Waiting for test results...'

  return (
    <div className={classes.root}>
      <SectionHeader
        title={
          <div className={classes.header}>
            <div className={classes.headerScenario}>
              <Link
                component={RouterLink}
                color="inherit"
                to={getScenarioUrl(execution.configuration.id)}
              >
                {execution.configuration.name}
              </Link>
            </div>
            <div className={classes.headerSeparator}>
              <ChevronRight />
            </div>
            <div className={classes.headerDate}>
              {moment(execution.start_locust || execution.start).format(
                'YYYY-MM-DD'
              )}
            </div>
          </div>
        }
        marginBottom
      />

      <Grid container spacing={16}>
        <Grid item xs={12} md={isZoomed ? 12 : 4}>
          <Paper square className={classes.tile}>
            <SectionHeader
              size="small"
              className={classes.tileTitle}
              title="All Requests"
            >
              <ZoomButton
                isZoomed={isZoomed}
                onZoomIn={() => setIsZoomed(true)}
                onZoomOut={() => setIsZoomed(false)}
              />
            </SectionHeader>
            <div className={classes.chartContainer}>
              <RequestsChart
                execution={execution}
                data={resultsPerTick}
                syncId="sync-chart"
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={isZoomed ? 12 : 4}>
          <Paper square className={classes.tile}>
            <SectionHeader
              size="small"
              className={classes.tileTitle}
              title="Requests Response Time"
            >
              <ZoomButton
                isZoomed={isZoomed}
                onZoomIn={() => setIsZoomed(true)}
                onZoomOut={() => setIsZoomed(false)}
              />
            </SectionHeader>
            <div className={classes.chartContainer}>
              <ResponseTimeChart
                execution={execution}
                data={resultsPerTick}
                syncId="sync-chart"
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={isZoomed ? 12 : 4}>
          <Paper square className={classes.tile}>
            <SectionHeader
              size="small"
              className={classes.tileTitle}
              title="Users Spawn"
            >
              <ZoomButton
                isZoomed={isZoomed}
                onZoomIn={() => setIsZoomed(true)}
                onZoomOut={() => setIsZoomed(false)}
              />
            </SectionHeader>
            <div className={classes.chartContainer}>
              <UsersSpawnChart
                execution={execution}
                data={resultsPerTick}
                syncId="sync-chart"
              />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper square className={classes.tile}>
            <SectionHeader
              size="small"
              className={classes.tileTitle}
              title="Request Results"
            />
            <NoDataPlaceholder label={noDataMessage} data={resultsPerEndpoint}>
              <ResultsPerEndpointChart data={resultsPerEndpoint} />
            </NoDataPlaceholder>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper square className={classes.tile}>
            <SectionHeader
              size="small"
              className={classes.tileTitle}
              title="Requests/Second by request"
            />
            <NoDataPlaceholder label={noDataMessage} data={resultsPerEndpoint}>
              <RequestsPerSecondChart data={resultsPerEndpoint} />
            </NoDataPlaceholder>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper square className={classes.tile}>
            <NoDataPlaceholder label={noDataMessage} data={resultsPerEndpoint}>
              <ResponsesTable data={resultsPerEndpoint} onDetails={() => {}} />
            </NoDataPlaceholder>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      executionId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

function useExecution(executionId) {
  const {
    data: { execution },
    loading,
  } = useQuery(GET_EXECUTION, {
    variables: { executionId },
  })

  return { data: execution, loading }
}

function useResultsPerTick(executionId) {
  const {
    data: { resultsPerTick },
    loading,
  } = useQuery(GET_EXECUTION_RESULTS_PER_TICK, {
    variables: { executionId },
  })

  const preparedData = useMemo(
    () =>
      (resultsPerTick || []).map(result => ({
        ...result,
        timestamp: +new Date(result.timestamp),
      })),
    [resultsPerTick]
  )

  return {
    data: preparedData,
    loading,
  }
}

function useResultsPerEndpoint(executionId) {
  const {
    data: { resultsPerEndpoint },
    loading,
  } = useQuery(GET_EXECUTION_RESULTS_DISTRIBUTION, {
    variables: { executionId },
  })

  const preparedData = useMemo(
    () =>
      (resultsPerEndpoint || []).map(result => ({
        ...result,
        num_successes: +result['num_requests'] - +result['num_failures'],
      })),
    [resultsPerEndpoint]
  )

  return {
    data: preparedData,
    loading,
  }
}

export default withStyles(styles)(Details)
