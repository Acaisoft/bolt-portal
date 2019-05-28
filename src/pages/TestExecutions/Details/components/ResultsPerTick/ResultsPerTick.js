import React, { useState, useMemo } from 'react'
import moment from 'moment'

import { useSubscription } from 'react-apollo-hooks'
import { Grid, Paper } from '@material-ui/core'
import { NoDataPlaceholder, SectionHeader, ZoomButton } from '~components'

import RequestsChart from './RequestsChart'
import ResponseTimeChart from './ResponseTimeChart'
import UsersSpawnChart from './UsersSpawnChart'

import { Chart } from '~config/constants'
import { SUBSCRIBE_TO_EXECUTION_RESULTS_PER_TICK } from './graphql'

function ResultsPerTick({ classes, execution }) {
  const [isZoomed, setIsZoomed] = useState(false)

  const { resultsPerTick, loading } = useResultsPerTickQuery(execution.id)
  const domainX = useExecutionTimeDomain(execution)

  if (loading || resultsPerTick.length === 0) {
    return (
      <Grid item xs={12}>
        <Paper square className={classes.tile}>
          <NoDataPlaceholder
            height={Chart.HEIGHT}
            label={loading ? 'Loading data...' : 'Waiting for test run results...'}
          />
        </Paper>
      </Grid>
    )
  }

  return (
    <React.Fragment>
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
              domainX={domainX}
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
              domainX={domainX}
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
              domainX={domainX}
              execution={execution}
              data={resultsPerTick}
              syncId="sync-chart"
            />
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  )
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
    loading,
  }
}

function useExecutionTimeDomain(execution) {
  return useMemo(() => {
    const executionDuration = +execution.configuration.configuration_parameters[0]
      .value

    const startTimestamp = new Date(execution.start_locust)
    const estimatedEndTimestamp = moment(startTimestamp)
      .add(executionDuration, 'seconds')
      .toDate()

    return [+startTimestamp, +estimatedEndTimestamp]
  }, [execution])
}

export default ResultsPerTick
