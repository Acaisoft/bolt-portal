import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { TooltipBuilder } from 'utils/echartUtils'
import { formatThousands } from 'utils/numbers'
import { DefaultChart } from 'components'

const formatLabel = label => _.truncate(label, { length: 15, omission: '...' })

export function RequestsPerSecondChart({ data }) {
  const options = React.useMemo(() => {
    return {
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },
        formatter: data => {
          return new TooltipBuilder(data)
            .withDefaultHeader()
            .withNumericDataLine('Requests/s')
            .getHtml()
        },
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: value => (value > 1 ? formatThousands(value) : value),
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
          name: 'Requests/s',
          type: 'bar',
          barWidth: 20,
          data: data.map(datum =>
            Math.round(
              datum.requests_per_second < 1 && datum.requests_per_second > 0
                ? 1
                : datum.requests_per_second
            )
          ),
        },
      ],
    }
  }, [data])
  return <DefaultChart options={options} />
}
RequestsPerSecondChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
}

export default RequestsPerSecondChart
