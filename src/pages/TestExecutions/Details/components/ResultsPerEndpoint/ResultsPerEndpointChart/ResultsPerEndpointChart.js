import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core'
import { TooltipBuilder } from 'utils/echartUtils'
import { formatThousands } from 'utils/numbers'
import { DefaultChart } from 'components'

const formatLabel = label => _.truncate(label, { length: 15, omission: '...' })

export function ResultsPerEndpointChart({ data, theme }) {
  const { color } = theme.palette.chart

  const barColors = [color.area.error, color.area.success]

  const options = useMemo(() => {
    return {
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },
        formatter: data => {
          return new TooltipBuilder(data)
            .withDefaultHeader()
            .withNumericDataLine('Fail')
            .withNumericDataLine('Success')
            .getHtml()
        },
      },
      color: barColors,
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: value => formatThousands(value),
        },
      },
      yAxis: {
        type: 'category',
        data: data.map(d => d.name),
        axisLabel: {
          formatter: formatLabel,
        },
      },
      series: [
        {
          name: 'Fail',
          type: 'bar',
          stack: 'group',
          barWidth: 20,
          data: data.map(datum => datum.num_failures),
        },
        {
          name: 'Success',
          type: 'bar',
          stack: 'group',
          barWidth: 20,
          data: data.map(datum => datum.num_successes),
        },
      ],
    }
  }, [data, barColors])
  return <DefaultChart options={options} />
}
ResultsPerEndpointChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(ResultsPerEndpointChart)
