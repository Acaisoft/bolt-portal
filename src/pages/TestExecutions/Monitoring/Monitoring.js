import React from 'react'

import { SectionHeader } from '~components'

import { MonitoringLineChart } from './components'
import rawChartsConfig from './chartsConfig.json'
import rawMonitoringData from './monitoringData.json'
import { getDataForChart } from './module.js'

// TODO: Remove mocks when data is available on backend
const charts = rawChartsConfig.charts
const monitoringData = rawMonitoringData

function Monitoring() {
  return (
    <div>
      <SectionHeader title="Monitoring" />

      {charts.map((chartConfig, index) => {
        const { groupNames, data } = getDataForChart(chartConfig, monitoringData)
        console.log({ chartConfig, data, groupNames })

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

export default React.memo(Monitoring)
