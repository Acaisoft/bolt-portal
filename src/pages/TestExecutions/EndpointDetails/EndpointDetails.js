import React, { useMemo } from 'react'
import moment from 'moment'
import { useQuery } from 'react-apollo-hooks'
import filesize from 'filesize'

import { Grid, Paper, withStyles } from '@material-ui/core'
import { SectionHeader, Loader, Breadcrumbs, LabeledValue } from '~components'

import { getUrl } from '~utils/router'
import routes from '~config/routes'
import { formatThousands } from '~utils/numbers'

import {
  GET_CONFIGURATION,
  GET_EXECUTION,
  GET_ENDPOINT,
  GET_ENDPOINT_DISTRIBUTION,
  GET_ENDPOINT_ERRORS,
} from './graphql'
import styles from './EndpointDetails.styles'
import { FailuresChart, TimeDistributionChart } from './components'

function EndpointDetails({ classes, history, match }) {
  const { configurationId, executionId, endpointId } = match.params

  const { endpointTotals, endpointTotalsLoading } = useEndpointQuery(endpointId)
  const { execution, executionLoading } = useExecutionQuery(executionId)
  const { configuration, configurationLoading } = useConfigurationQuery(
    configurationId
  )
  const {
    endpointDistribution,
    endpointDistributionLoading,
  } = useEndpointDistributionQuery(endpointId)
  const { endpointErrors, endpointErrorsLoading } = useEndpointErrorsQuery(
    endpointId
  )

  const breadcrumbs = useBreadcrumbs({
    params: match.params,
    endpointTotals,
    execution,
    configuration,
  })

  if (
    endpointTotalsLoading ||
    executionLoading ||
    configurationLoading ||
    endpointDistributionLoading ||
    endpointErrorsLoading
  ) {
    return <Loader loading />
  }

  return (
    <div>
      <SectionHeader title={<Breadcrumbs items={breadcrumbs} />} marginBottom />

      <Grid container spacing={16}>
        <Grid item xs={12} md={3} container spacing={16}>
          <Grid item xs={12} className={classes.verticalGrid}>
            <Paper square className={classes.tile}>
              <SectionHeader title="Response Times" size="small" />
              <div className={classes.tileContent}>
                <Grid container spacing={8}>
                  <Grid item xs={4}>
                    <LabeledValue
                      label="Minimal"
                      value={`${formatThousands(
                        endpointTotals.min_response_time
                      )} ms`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LabeledValue
                      label="Average"
                      value={`${formatThousands(
                        endpointTotals.average_response_time
                      )} ms`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LabeledValue
                      label="Maximal"
                      value={`${formatThousands(
                        endpointTotals.max_response_time
                      )} ms`}
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper square className={classes.tile}>
              <SectionHeader title="Response Size" size="small" />

              <div className={classes.tileContent}>
                <Grid container spacing={32}>
                  <Grid item xs={4}>
                    <LabeledValue
                      label="Minimal"
                      value={filesize(endpointTotals.min_content_size || 0, {
                        round: 0,
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LabeledValue
                      label="Average"
                      value={filesize(endpointTotals.average_content_size || 0, {
                        round: 0,
                      })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LabeledValue
                      label="Maximal"
                      value={filesize(endpointTotals.max_content_size || 0, {
                        round: 0,
                      })}
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper square className={classes.tile}>
            <SectionHeader title="Failures" size="small" />
            <div className={classes.tileContent}>
              <FailuresChart data={endpointErrors} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper square className={classes.tile}>
            <SectionHeader title="Time Distribution" size="small" />
            <div className={classes.tileContent}>
              <TimeDistributionChart data={endpointDistribution} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

function useBreadcrumbs({ params, configuration, execution, endpointTotals }) {
  const breadcrumbs = useMemo(() => {
    const executionStart = execution.start || execution.start_locust

    return [
      {
        url: getUrl(routes.projects.configurations.list, { ...params }),
        label: 'Scenarios',
      },
      {
        url: getUrl(routes.projects.configurations.details, { ...params }),
        label: configuration.name || 'Scenario details',
      },
      {
        url: getUrl(routes.projects.configurations.executions.list, { ...params }),
        label: 'Test Runs',
      },
      {
        url: getUrl(routes.projects.configurations.executions.details, {
          ...params,
        }),
        label: executionStart
          ? moment(executionStart).format('YYYY-MM-DD')
          : 'Execution details',
      },
      {
        url: null,
        label: endpointTotals.method
          ? `${endpointTotals.method} ${endpointTotals.name}`
          : 'Request results',
      },
    ]
  }, [params, configuration, execution, endpointTotals])

  return breadcrumbs
}

function useEndpointQuery(endpointId) {
  const {
    loading,
    data: { endpointTotals = [] },
  } = useQuery(GET_ENDPOINT, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return { endpointTotalsLoading: loading, endpointTotals: endpointTotals[0] || {} }
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
    endpointDistributionLoading: loading,
    endpointDistribution: endpointDistribution ? endpointDistribution[0] : null,
  }
}

function useEndpointErrorsQuery(endpointId) {
  const {
    loading,
    data: { endpointErrors = [] },
  } = useQuery(GET_ENDPOINT_ERRORS, {
    variables: { endpointId },
    fetchPolicy: 'cache-and-network',
  })

  return {
    endpointErrorsLoading: loading,
    endpointErrors,
  }
}

function useExecutionQuery(executionId) {
  const {
    loading,
    data: { execution = {} },
  } = useQuery(GET_EXECUTION, {
    variables: { executionId },
    fetchPolicy: 'cache-first',
  })

  return { executionLoading: loading, execution }
}

function useConfigurationQuery(configurationId) {
  const {
    loading,
    data: { configuration = {} },
  } = useQuery(GET_CONFIGURATION, {
    variables: { configurationId },
    fetchPolicy: 'cache-first',
  })

  return { configurationLoading: loading, configuration }
}

export default withStyles(styles)(EndpointDetails)
