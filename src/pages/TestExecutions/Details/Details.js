import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSubscription } from 'react-apollo-hooks'

import { withStyles, Paper, Grid } from '@material-ui/core'

import {
  Loader,
  SectionHeader,
  ZoomButton,
  NoDataPlaceholder,
  Breadcrumbs,
} from '~components'

import {
  RequestsChart,
  RequestsPerSecondChart,
  ResponseTimeChart,
  ResultsPerEndpointChart,
  UsersSpawnChart,
} from './components/charts'
import { ResponsesTable } from './components/tables'

import {
  SUBSCRIBE_TO_EXECUTION,
  SUBSCRIBE_TO_EXECUTION_RESULTS_DISTRIBUTION,
  SUBSCRIBE_TO_EXECUTION_RESULTS_PER_TICK,
} from './graphql'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import styles from './Details.styles'

export function Details({ classes, history, match }) {
  const { executionId } = match.params
  const [isZoomed, setIsZoomed] = useState(false)

  const { execution, executionLoading } = useExecutionQuery(executionId)
  const { resultsPerTick, resultsPerTickLoading } = useResultsPerTickQuery(
    executionId
  )
  const {
    resultsPerEndpoint,
    resultsPerEndpointLoading,
  } = useResultsPerEndpointQuery(executionId)

  const breadcrumbs = useBreadcrumbs({ params: match.params, execution })

  const getEndpointDetailsUrl = useCallback(
    endpoint => {
      return getUrl(routes.projects.configurations.executions.endpoints.details, {
        ...match.params,
        endpointId: endpoint.identifier,
      })
    },
    [match.params]
  )

  if (executionLoading || resultsPerTickLoading || resultsPerEndpointLoading) {
    return <Loader loading fill />
  }

  const noDataMessage = 'Waiting for test results...'

  return (
    <div className={classes.root}>
      <SectionHeader
        title={
          // <Breadcrumbs items={breadcrumbs} />
          breadcrumbs[breadcrumbs.length - 1].label
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
              <ResponsesTable
                data={resultsPerEndpoint}
                getEndpointDetailsUrl={getEndpointDetailsUrl}
              />
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

export default withStyles(styles)(Details)

function useExecutionQuery(executionId) {
  const { data: { execution } = {}, loading } = useSubscription(
    SUBSCRIBE_TO_EXECUTION,
    {
      variables: { executionId },
      fetchPolicy: 'cache-and-network',
    }
  )

  return { execution, executionLoading: loading }
}

function useResultsPerTickQuery(executionId) {
  const { data: { resultsPerTick } = {}, loading } = useSubscription(
    SUBSCRIBE_TO_EXECUTION_RESULTS_PER_TICK,
    {
      variables: { executionId },
      fetchPolicy: 'cache-and-network',
    }
  )

  const preparedData = useMemo(
    () =>
      (resultsPerTick || []).map(result => ({
        ...result,
        timestamp: +new Date(result.timestamp),
      })),
    [resultsPerTick]
  )

  return {
    resultsPerTick: preparedData,
    resultsPerTickLoading: loading,
  }
}

function useResultsPerEndpointQuery(executionId) {
  const { data: { resultsPerEndpoint } = {}, loading } = useSubscription(
    SUBSCRIBE_TO_EXECUTION_RESULTS_DISTRIBUTION,
    {
      variables: { executionId },
      fetchPolicy: 'cache-and-network',
    }
  )

  const preparedData = useMemo(
    () =>
      (resultsPerEndpoint || []).map(result => ({
        ...result,
        num_successes: +result['num_requests'] - +result['num_failures'],
      })),
    [resultsPerEndpoint]
  )

  return {
    resultsPerEndpoint: preparedData,
    resultsPerEndpointLoading: loading,
  }
}

function useBreadcrumbs({ params, execution }) {
  const breadcrumbs = useMemo(() => {
    const executionStart = execution && (execution.start_locust || execution.start)

    return [
      {
        url: getUrl(routes.projects.configurations.details, { ...params }),
        label: (execution && execution.configuration.name) || 'Scenario details',
      },
      {
        url: null,
        label: executionStart
          ? moment(executionStart).format('YYYY-MM-DD HH:mm:ss')
          : 'Execution details',
      },
    ]
  }, [params, execution])

  return breadcrumbs
}
