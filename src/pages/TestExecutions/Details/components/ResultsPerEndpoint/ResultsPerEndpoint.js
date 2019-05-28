import React, { useMemo } from 'react'

import { useSubscription } from 'react-apollo-hooks'
import { Grid, Paper } from '@material-ui/core'
import { NoDataPlaceholder, SectionHeader } from '~components'
import { Chart } from '~config/constants'

import ResultsPerEndpointChart from './ResultsPerEndpointChart'
import RequestsPerSecondChart from './RequestsPerSecondChart'
import ResponsesTable from './ResponsesTable'

import { SUBSCRIBE_TO_EXECUTION_RESULTS_DISTRIBUTION } from './graphql'

function ResultsPerEndpoint({ classes, execution, getEndpointDetailsUrl }) {
  const { resultsPerEndpoint, loading } = useResultsPerEndpointQuery(execution.id)

  if (loading || resultsPerEndpoint.length === 0) {
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
    loading,
  }
}

export default ResultsPerEndpoint
