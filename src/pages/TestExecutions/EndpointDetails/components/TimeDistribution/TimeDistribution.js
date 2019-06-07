import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { Paper } from '@material-ui/core'
import { SectionHeader, LoadingPlaceholder, ErrorPlaceholder } from '~components'

import TimeDistributionChart from './TimeDistributionChart'
import { GET_ENDPOINT_DISTRIBUTION } from './graphql'
import { Chart } from '~config/constants'

function TimeDistribution({ classes, endpointId }) {
  const { endpointDistribution, loading, error } = useEndpointDistributionQuery(
    endpointId
  )

  if (loading || error || endpointDistribution.length === 0) {
    return (
      <Paper square className={classes.tile}>
        {loading ? (
          <LoadingPlaceholder
            title="Loading time distribution..."
            height={Chart.HEIGHT}
          />
        ) : error ? (
          <ErrorPlaceholder error={error} height={Chart.HEIGHT} />
        ) : (
          <LoadingPlaceholder
            title="Waiting for endpoint results..."
            height={Chart.HEIGHT}
          />
        )}
      </Paper>
    )
  }

  return (
    <Paper square className={classes.tile}>
      <SectionHeader title="Time Distribution" size="small" />
      <div className={classes.tileContent}>
        <TimeDistributionChart data={endpointDistribution} />
      </div>
    </Paper>
  )
}

function useEndpointDistributionQuery(endpointId) {
  const {
    loading,
    error,
    data: { endpointDistribution = [] },
  } = useQuery(GET_ENDPOINT_DISTRIBUTION, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return {
    loading,
    error,
    endpointDistribution: endpointDistribution[0] || {},
  }
}

export default TimeDistribution
