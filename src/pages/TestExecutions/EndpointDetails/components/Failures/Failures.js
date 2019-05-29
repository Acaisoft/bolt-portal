import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { Paper } from '@material-ui/core'
import { NoDataPlaceholder, SectionHeader } from '~components'

import FailuresChart from './FailuresChart'
import { GET_ENDPOINT_FAILURES } from './graphql'

function Failures({ classes, endpointId }) {
  const { endpointFailures, loading } = useEndpointFailures(endpointId)

  return (
    <Paper square className={classes.tile}>
      {loading ? (
        <NoDataPlaceholder label="Loading failures..." height="100%" />
      ) : (
        <React.Fragment>
          <SectionHeader title="Failures" size="small" />
          <div className={classes.tileContent}>
            <FailuresChart data={endpointFailures} />
          </div>
        </React.Fragment>
      )}
    </Paper>
  )
}

function useEndpointFailures(endpointId) {
  const {
    loading,
    data: { endpointFailures = [] },
  } = useQuery(GET_ENDPOINT_FAILURES, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return {
    loading,
    endpointFailures,
  }
}

export default Failures
