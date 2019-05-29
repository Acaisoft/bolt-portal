import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { Paper } from '@material-ui/core'
import { NoDataPlaceholder, SectionHeader } from '~components'

import TimeDistributionChart from './TimeDistributionChart'
import { GET_ENDPOINT_DISTRIBUTION } from './graphql'

function TimeDistribution({ classes, endpointId }) {
  const { endpointDistribution, loading } = useEndpointDistributionQuery(endpointId)

  return (
    <Paper square className={classes.tile}>
      {loading ? (
        <NoDataPlaceholder label="Loading time distribution..." />
      ) : (
        <React.Fragment>
          <SectionHeader title="Time Distribution" size="small" />
          <div className={classes.tileContent}>
            <TimeDistributionChart data={endpointDistribution} />
          </div>
        </React.Fragment>
      )}
    </Paper>
  )
}

function useEndpointDistributionQuery(endpointId) {
  const {
    loading,
    data: { endpointDistribution = [] },
  } = useQuery(GET_ENDPOINT_DISTRIBUTION, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return {
    loading,
    endpointDistribution: endpointDistribution[0] || {},
  }
}

export default TimeDistribution
