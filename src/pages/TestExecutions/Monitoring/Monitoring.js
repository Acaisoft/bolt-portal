import React, { useMemo, useCallback } from 'react'
import moment from 'moment'

import { useSubscription } from 'react-apollo-hooks'
import { Grid, Paper, Box } from '@material-ui/core'
import {
  SectionHeader,
  Button,
  LoadingPlaceholder,
  ErrorPlaceholder,
  NotFoundPlaceholder,
} from '~components'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import { MonitoringLineChart } from './components'
import { getDataForChart } from './module.js'
import { SUBSCRIBE_TO_EXECUTION_WITH_MONITORING_DATA } from './graphql'
import useStyles from './Monitoring.styles'

function Monitoring({ match, history, location }) {
  const { executionId } = match.params

  const classes = useStyles()

  const { data: { execution } = {}, loading, error } = useSubscription(
    SUBSCRIBE_TO_EXECUTION_WITH_MONITORING_DATA,
    {
      variables: { executionId },
    }
  )

  const chartsWithData = useMemo(() => {
    if (!execution) {
      return []
    }

    const charts = execution.execution_metrics_metadata[0].chart_configuration.charts
    const monitoringData = execution.execution_metrics_data

    return charts.map(chartConfig => ({
      chartConfig,
      ...getDataForChart(chartConfig, monitoringData),
    }))
  }, [execution])

  const getTestDetailsUrl = useCallback(() => {
    return getUrl(routes.projects.configurations.executions.details, {
      ...match.params,
    })
  }, [match.params])

  if (loading || error || !execution || !chartsWithData) {
    return (
      <Box p={3}>
        {loading ? (
          <LoadingPlaceholder title="Loading monitoring results..." />
        ) : error ? (
          <ErrorPlaceholder error={error} />
        ) : !execution ? (
          <NotFoundPlaceholder title="Test run not found" />
        ) : (
          <LoadingPlaceholder title="Waiting for results..." />
        )}
      </Box>
    )
  }

  const { configuration } = execution

  return (
    <div>
      <SectionHeader
        title={`Monitoring for Test Run ${
          execution
            ? moment(execution.start_locust || execution.start).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            : ''
        }`}
        marginBottom
      >
        {configuration.has_load_tests && (
          <Button href={getTestDetailsUrl()}>Test details</Button>
        )}
      </SectionHeader>

      <Grid container spacing={2}>
        {chartsWithData.map(({ groupNames, chartConfig, data }, index) => {
          return (
            <Grid item xs={12} md={6} key={`chart-${index}`}>
              <Paper square className={classes.tile}>
                <MonitoringLineChart
                  data={data}
                  config={chartConfig}
                  groupNames={groupNames}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Monitoring
