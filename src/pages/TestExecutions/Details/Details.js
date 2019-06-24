import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useSubscription } from 'react-apollo-hooks'
import { Grid, Box } from '@material-ui/core'
import {
  SectionHeader,
  Button,
  LoadingPlaceholder,
  ErrorPlaceholder,
  NotFoundPlaceholder,
  ExpandablePanel,
} from '~components'
import { TestConfigurationDetails } from '~pages/TestConfigurations/Details/components'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import { ExecutionActionsMenu } from '../components'
import { ResultsPerEndpoint, ResultsPerTick } from './components'
import { SUBSCRIBE_TO_EXECUTION } from './graphql'

import useStyles from './Details.styles'

export function Details({ history, match }) {
  const { executionId } = match.params
  const { configurationId } = match.params

  const classes = useStyles()

  const { data: { execution } = {}, loading, error } = useSubscription(
    SUBSCRIBE_TO_EXECUTION,
    {
      variables: { executionId },
      fetchPolicy: 'cache-and-network',
    }
  )

  const { getEndpointDetailsUrl, getMonitoringUrl } = useUrlGetters(match.params)

  if (loading || error || !execution) {
    return (
      <Box p={3}>
        {loading ? (
          <LoadingPlaceholder title="Loading test run results..." />
        ) : error ? (
          <ErrorPlaceholder error={error} />
        ) : (
          <NotFoundPlaceholder title="Test run not found" />
        )}
      </Box>
    )
  }

  return (
    <div className={classes.root}>
      <SectionHeader
        title={moment(execution.start_locust || execution.start).format(
          'YYYY-MM-DD HH:mm:ss'
        )}
      >
        {execution.configuration.has_monitoring && (
          <Button href={getMonitoringUrl()}>Monitoring</Button>
        )}
        <ExecutionActionsMenu execution={execution} />
      </SectionHeader>
      <div className={classes.configDetails}>
        <ExpandablePanel defaultExpanded={false} title="Scenario Details">
          <TestConfigurationDetails configurationId={configurationId} />
        </ExpandablePanel>
      </div>
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

function useUrlGetters(matchParams) {
  const getEndpointDetailsUrl = useCallback(
    endpoint => {
      return getUrl(routes.projects.configurations.executions.endpoints.details, {
        ...matchParams,
        endpointId: endpoint.identifier,
      })
    },
    [matchParams]
  )

  const getMonitoringUrl = useCallback(() => {
    return getUrl(routes.projects.configurations.executions.monitoring, {
      ...matchParams,
    })
  }, [matchParams])

  return {
    getEndpointDetailsUrl,
    getMonitoringUrl,
  }
}

export default Details
