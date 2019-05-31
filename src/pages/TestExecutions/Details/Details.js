import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useSubscription } from 'react-apollo-hooks'
import { Grid } from '@material-ui/core'
import { Loader, SectionHeader } from '~components'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import { ResultsPerEndpoint, ResultsPerTick } from './components'
import { SUBSCRIBE_TO_EXECUTION } from './graphql'

import useStyles from './Details.styles'

export function Details({ history, match }) {
  const { executionId } = match.params

  const classes = useStyles()

  const { data: { execution } = {}, loading } = useSubscription(
    SUBSCRIBE_TO_EXECUTION,
    {
      variables: { executionId },
      fetchPolicy: 'cache-and-network',
    }
  )

  const getEndpointDetailsUrl = useCallback(
    endpoint => {
      return getUrl(routes.projects.configurations.executions.endpoints.details, {
        ...match.params,
        endpointId: endpoint.identifier,
      })
    },
    [match.params]
  )

  if (loading) {
    return <Loader loading fill />
  }

  return (
    <div className={classes.root}>
      <SectionHeader
        title={moment(execution.start_locust || execution.start).format(
          'YYYY-MM-DD HH:mm:ss'
        )}
        marginBottom
      />

      <Grid container spacing={2}>
        <ResultsPerTick classes={classes} execution={execution} />
        <ResultsPerEndpoint
          classes={classes}
          getEndpointDetailsUrl={getEndpointDetailsUrl}
          execution={execution}
        />
      </Grid>
    </div>
  )
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      executionId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Details
