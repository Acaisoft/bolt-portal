import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { withStyles } from '@material-ui/core'

import { TooltipBuilder } from '~utils/echartUtils'
import { formatThousands } from '~utils/numbers'
import { DefaultChart } from '~components'

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function RequestsChart({ data, theme, syncGroup }) {
  const { color } = theme.palette.chart
  const areaColors = [color.area.error, color.area.success]
  const options = React.useMemo(() => {
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
        data: ['Fail', 'Success'],
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
        {
          name: 'Fail',
          type: 'line',
          areaStyle: {},
          data: data.map(datum => datum.number_of_fails),
        },
        {
          name: 'Success',
          type: 'line',
          areaStyle: {},
          data: data.map(datum => datum.number_of_successes),
        },
      ],
    }
  }, [data, areaColors])

  return <DefaultChart options={options} syncGroup={syncGroup} />
}
RequestsChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(RequestsChart)
