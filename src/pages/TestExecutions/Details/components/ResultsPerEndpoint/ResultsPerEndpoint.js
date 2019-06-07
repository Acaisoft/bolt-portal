import React, { useMemo } from 'react'

import { useSubscription } from 'react-apollo-hooks'
import { Grid, Paper } from '@material-ui/core'
import { SectionHeader, LoadingPlaceholder, ErrorPlaceholder } from '~components'
import { Chart } from '~config/constants'

import ResultsPerEndpointChart from './ResultsPerEndpointChart'
import RequestsPerSecondChart from './RequestsPerSecondChart'
import ResponsesTable from './ResponsesTable'

import { SUBSCRIBE_TO_EXECUTION_RESULTS_DISTRIBUTION } from './graphql'

function ResultsPerEndpoint({ classes, execution, getEndpointDetailsUrl }) {
  const { resultsPerEndpoint, loading, error } = useResultsPerEndpointQuery(
    execution.id
  )

  if (loading || error || resultsPerEndpoint.length === 0) {
    return (
      <Grid item xs={12}>
        <Paper square className={classes.tile}>
          {loading ? (
            <LoadingPlaceholder title="Loading data..." height={Chart.HEIGHT} />
          ) : error ? (
            <ErrorPlaceholder error={error} height={Chart.HEIGHT} />
          ) : (
            <LoadingPlaceholder
              title="Waiting for test run results..."
              height={Chart.HEIGHT}
            />
          )}
        </Paper>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={6}>
        <Paper square className={classes.tile}>
          <SectionHeader
            size="small"
            className={classes.tileTitle}
            title="Request Results"
          />
          <ResultsPerEndpointChart data={resultsPerEndpoint} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper square className={classes.tile}>
          <SectionHeader
            size="small"
            className={classes.tileTitle}
            title="Requests/Second by request"
          />
          <RequestsPerSecondChart data={resultsPerEndpoint} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper square className={classes.tile}>
          <ResponsesTable
            data={resultsPerEndpoint}
            getEndpointDetailsUrl={getEndpointDetailsUrl}
          />
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

function useResultsPerEndpointQuery(executionId) {
  const { data: { resultsPerEndpoint } = {}, loading, error } = useSubscription(
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
    loading,
    error,
  }
}

export default ResultsPerEndpoint
