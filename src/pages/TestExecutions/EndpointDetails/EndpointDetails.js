import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { Grid, Box } from '@material-ui/core'
import {
  SectionHeader,
  LoadingPlaceholder,
  ErrorPlaceholder,
  NotFoundPlaceholder,
} from 'components'

import { Failures, TimeDistribution, Stats } from './components'
import { GET_ENDPOINT } from './graphql'
import useStyles from './EndpointDetails.styles'

function EndpointDetails() {
  const { endpointId } = useParams()
  const classes = useStyles()
  const { endpoint, loading, error } = useEndpointQuery(endpointId)

  if (loading || error || !endpoint) {
    return (
      <Box p={3}>
        {loading ? (
          <LoadingPlaceholder title="Loading endpoint results..." />
        ) : error ? (
          <ErrorPlaceholder error={error} />
        ) : (
          <NotFoundPlaceholder title="Endpoint not found" />
        )}
      </Box>
    )
  }

  return (
    <div>
      <SectionHeader title={`${endpoint.method} ${endpoint.name}`} marginBottom />

      <Grid container spacing={2} alignItems="stretch">
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
    error,
    data: { endpoint = [] } = {},
  } = useQuery(GET_ENDPOINT, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return { loading, error, endpoint: endpoint[0] || {} }
}

export default EndpointDetails
