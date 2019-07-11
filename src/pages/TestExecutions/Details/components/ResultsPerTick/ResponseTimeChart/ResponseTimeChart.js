import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { TooltipBuilder } from '~utils/echartUtils'
import { formatScaledDuration } from '~utils/datetime'

import { DefaultChart } from '~components'

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function ResponseTimeChart({ data, syncGroup }) {
  const options = React.useMemo(() => {
    return {
      tooltip: {
        formatter: data => {
          return new TooltipBuilder(data)
            .withDefaultHeader()
            .withDurationLine('Avg. response time')
            .getHtml()
        },
      },
      legend: {
        show: true,
        data: ['Avg. response time'],
      },
      xAxis: {
        type: 'category',
        data: data.map(d => formatTimestamp(d.timestamp)),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: formatScaledDuration,
        },
      },
      series: [
        {
          name: 'Avg. response time',
          type: 'line',
          symbol: 'none',
          data: data.map(datum => datum.average_response_time),
        },
      ],
    }
  }, [data])

  return <DefaultChart options={options} syncGroup={syncGroup} />
}
ResponseTimeChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
}

export default ResponseTimeChart
