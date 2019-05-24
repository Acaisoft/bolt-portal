import React, { useMemo } from 'react'
import moment from 'moment'

import { useQuery } from 'react-apollo-hooks'
import { Grid, Paper, withStyles } from '@material-ui/core'
import { SectionHeader, Loader } from '~components'

import { MonitoringLineChart } from './components'
import { getDataForChart } from './module.js'
import { GET_EXECUTION_WITH_MONITORING_DATA } from './graphql'
import styles from './Monitoring.styles'

function Monitoring({ classes, match, history, location }) {
  const { executionId } = match.params

  const {
    data: { execution },
    loading,
  } = useQuery(GET_EXECUTION_WITH_MONITORING_DATA, {
    variables: { executionId },
  })

  const chartsWithData = useMemo(() => {
    if (!execution) {
      return null
    }

    const charts = execution.execution_metrics_metadata[0].chart_configuration.charts
    const monitoringData = execution.execution_metrics_data

    return charts.map(chartConfig => ({
      chartConfig,
      ...getDataForChart(chartConfig, monitoringData),
    }))
  }, [execution])

  if (loading) {
    return <Loader loading />
  }

  return (
    <div>
      <SectionHeader
        title={`Monitoring for Test Run ${moment(
          execution.start_locust || execution.start
        ).format('YYYY-MM-DD HH:mm:ss')}`}
        marginBottom
      />
      <Grid container spacing={16}>
        {chartsWithData.map(({ groupNames, chartConfig, data }, index) => {
          return (
            <Grid item xs={12} key={`chart-${index}`}>
              <Paper square className={classes.tile}>
                <SectionHeader title={chartConfig.title} size="small" marginBottom />
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

export default withStyles(styles)(Monitoring)
