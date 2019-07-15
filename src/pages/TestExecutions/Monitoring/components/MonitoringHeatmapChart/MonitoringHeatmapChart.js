import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { useTheme } from '@material-ui/styles'
import { SectionHeader, NoDataPlaceholder } from '~components'
import HeatmapChart from './HeatmapChart'

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

function MonitoringHeatmapChart({ data, config, groupNames }) {
  const theme = useTheme()

  const options = React.useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: data.map(d => formatTimestamp(d.timestamp)),
      },
      yAxis: {
        type: 'category',
        data: groupNames,
        axisLabel: {
          formatter: value => value.split('.').pop(),
        },
      },
      series: groupNames.map((groupName, groupIndex) => {
        return {
          name: groupName,
          type: 'heatmap',
          animation: false,
          itemStyle: {
            emphasis: {
              borderColor: '#333',
              borderWidth: 1,
            },
          },
          data: data.map((datum, datumIndex) => {
            const value = datum.groups[groupName]
            return [datumIndex, groupIndex, value === null ? null : +value]
          }),
        }
      }),
    }
  }, [data, groupNames])

  return (
    <React.Fragment>
      <SectionHeader title={config.title} size="small" marginBottom />

      {groupNames.length > 0 ? (
        <HeatmapChart
          activeColor={theme.palette.error.main}
          options={options}
          yFormat={config.y_format}
          legendLabels={['not backpressed', 'backpressed']}
        />
      ) : (
        <NoDataPlaceholder title="No Data" height={300} />
      )}
    </React.Fragment>
  )
}

MonitoringHeatmapChart.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  groupNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default MonitoringHeatmapChart
