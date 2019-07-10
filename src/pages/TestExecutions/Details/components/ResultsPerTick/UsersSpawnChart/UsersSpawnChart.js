import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { TooltipBuilder } from '~utils/echartUtils'
import { formatThousands } from '~utils/numbers'
import { DefaultChart } from '~components'

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function UsersSpawnChart({ data, syncGroup }) {
  const options = React.useMemo(() => {
    return {
      tooltip: {
        formatter: data => {
          return new TooltipBuilder(data)
            .withDefaultHeader()
            .withNumericDataLine('Users Spawn')
            .getHtml()
        },
      },
      legend: {
        show: true,
        data: ['Users Spawn'],
      },
      xAxis: {
        type: 'category',
        data: data.map(d => formatTimestamp(d.timestamp)),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: value => formatThousands(value),
        },
      },
      series: [
        {
          name: 'Users Spawn',
          type: 'line',
          data: data.map(datum => datum.number_of_users),
        },
      ],
    }
  }, [data])

  return <DefaultChart options={options} syncGroup={syncGroup} />
}
UsersSpawnChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
}

export default UsersSpawnChart
