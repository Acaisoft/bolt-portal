import React from 'react'
import { useQuery } from '@apollo/client'

import { Paper } from '@material-ui/core'
import {
  SectionHeader,
  LoadingPlaceholder,
  ErrorPlaceholder,
  NoDataPlaceholder,
} from 'components'

import FailuresChart from './FailuresChart'
import { GET_ENDPOINT_FAILURES } from './graphql'
import { Chart } from 'config/constants'

function Failures({ classes, endpointId }) {
  const { endpointFailures, loading, error } = useEndpointFailures(endpointId)

  if (loading || error || endpointFailures.length === 0) {
    return (
      <Paper square className={classes.tile}>
        {loading ? (
          <LoadingPlaceholder title="Loading failures..." height={Chart.HEIGHT} />
        ) : error ? (
          <ErrorPlaceholder error={error} height={Chart.HEIGHT} />
        ) : (
          <NoDataPlaceholder title="No failures" height={Chart.HEIGHT} />
        )}
      </Paper>
    )
  }

  return (
    <Paper square className={classes.tile}>
      <SectionHeader title="Failures" size="small" />
      <div className={classes.tileContent}>
        <FailuresChart data={endpointFailures} />
      </div>
    </Paper>
  )
}

function useEndpointFailures(endpointId) {
  const {
    loading,
    error,
    data: { endpointFailures = [] } = {},
  } = useQuery(GET_ENDPOINT_FAILURES, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return {
    loading,
    error,
    endpointFailures,
  }
}

export default Failures
