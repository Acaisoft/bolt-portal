import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { Grid, withStyles } from '@material-ui/core'
import { SectionHeader, Loader } from '~components'

import { Failures, TimeDistribution, Stats } from './components'
import { GET_ENDPOINT } from './graphql'
import styles from './EndpointDetails.styles'

function EndpointDetails({ classes, history, match }) {
  const { endpointId } = match.params

  const { endpoint, loading } = useEndpointQuery(endpointId)

  if (loading) {
    return <Loader loading />
  }

  return (
    <div>
      <SectionHeader title={`${endpoint.method} ${endpoint.name}`} marginBottom />

      <Grid container spacing={16} alignItems="stretch">
        <Grid item xs={12} md={3} className={classes.verticalGrid}>
          <Stats classes={classes} endpointId={endpointId} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Failures classes={classes} endpointId={endpointId} />
        </Grid>

        <Grid item xs={12} md={5}>
          <TimeDistribution classes={classes} endpointId={endpointId} />
        </Grid>
      </Grid>
    </div>
  )
}

function useEndpointQuery(endpointId) {
  const {
    loading,
    data: { endpoint = [] },
  } = useQuery(GET_ENDPOINT, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return { loading, endpoint: endpoint[0] || {} }
}

export default withStyles(styles)(EndpointDetails)
