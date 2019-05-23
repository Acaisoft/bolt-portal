import React, { useMemo } from 'react'

import { useQuery } from 'react-apollo-hooks'
import { SectionHeader, Loader } from '~components'

import { MonitoringLineChart } from './components'
import { getDataForChart } from './module.js'
import { GET_EXECUTION_WITH_MONITORING_DATA } from './graphql'

function Monitoring({ match, history, location }) {
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
      <SectionHeader title="Monitoring" />

      {chartsWithData.map(({ groupNames, chartConfig, data }, index) => {
        return (
          <React.Fragment key={`chart-${index}`}>
            <SectionHeader title={chartConfig.title} size="small" marginBottom />
            <MonitoringLineChart
              data={data}
              config={chartConfig}
              groupNames={groupNames}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Monitoring
