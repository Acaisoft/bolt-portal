import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { withStyles } from '@material-ui/core'

import { TooltipBuilder } from 'utils/echartUtils'
import { formatThousands } from 'utils/numbers'
import { DefaultChart } from 'components/index'

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function RequestsChart({ data, theme, syncGroup }) {
  const { color } = theme.palette.chart

  const hasFailures = data.some(item => item.number_of_fails > 0)
  const hasSuccesses = data.some(item => item.number_of_successes > 0)

  const areaColors = useMemo(() => {
    let colorsArray = []

    if (hasFailures) {
      colorsArray.push(color.area.error)
    }
    if (hasSuccesses) {
      colorsArray.push(color.area.success)
    }

    return colorsArray
  }, [color, hasFailures, hasSuccesses])

  const options = useMemo(() => {
    return {
      tooltip: {
        formatter: data => {
          return new TooltipBuilder(data)
            .withDefaultHeader()
            .withNumericDataLine('Fail')
            .withNumericDataLine('Success')
            .getHtml()
        },
      },
      legend: {
        show: true,
        data: [hasFailures && 'Fail', hasSuccesses && 'Success'],
      },
      color: areaColors,
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
        hasFailures
          ? {
              name: 'Fail',
              type: 'line',
              areaStyle: {},
              stack: 'requests',
              symbol: 'none',
              data: data.map(datum => datum.number_of_fails),
            }
          : null,
        hasSuccesses
          ? {
              name: 'Success',
              type: 'line',
              areaStyle: {},
              stack: 'requests',
              symbol: 'none',
              data: data.map(datum => datum.number_of_successes),
            }
          : null,
      ],
    }
  }, [data, areaColors, hasFailures, hasSuccesses])

  return <DefaultChart options={options} syncGroup={syncGroup} />
}
RequestsChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(RequestsChart)
