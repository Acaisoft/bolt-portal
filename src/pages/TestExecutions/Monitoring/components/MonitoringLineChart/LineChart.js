import React from 'react'
import moment from 'moment'

import filesize from 'filesize'
import { formatThousands, formatPercent } from '~utils/numbers'

import { TooltipBuilder } from '~utils/echartUtils'
import { DefaultChart } from '~components'

const formatters = {
  kBytes: value => filesize(value, { round: 3 }),
  bytes: value => filesize(value, { round: 2, exponent: 3 }),
  number: value => (value >= 1000 ? formatThousands(value) : value),
  percent: value => formatPercent(value, 0),
}

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function LineChart({ data, config, groupNames }) {
  const options = React.useMemo(() => {
    return {
      tooltip: {
        formatter: data => {
          return new TooltipBuilder(data).getTooltipForMonitoring(config.y_format)
        },
      },
      xAxis: {
        type: 'category',
        data: data.map(d => formatTimestamp(d.timestamp)),
      },
      yAxis: {
        min: config.min ? config.min : config.y_format === 'percent' ? 0 : null,
        max: config.max ? config.max : config.y_format === 'percent' ? 1 : null,
        type: config.scale === 'log' ? config.scale : 'value',
        axisLabel: {
          formatter: formatters[config.y_format],
        },
      },
      series: groupNames.map(groupName => {
        const isStacked = config.type === 'stacked'

        return {
          areaStyle: isStacked ? {} : undefined,
          stack: isStacked ? 'defaultStack' : undefined,
          name: groupName,
          type: 'line',
          showSymbol: false,
          animation: false,
          data: data.map(datum => {
            return datum.groups[groupName]
          }),
        }
      }),
    }
  }, [data, config, groupNames])

  return <DefaultChart options={options} />
}

export default LineChart
