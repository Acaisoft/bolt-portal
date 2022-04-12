import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { formatScaledDuration } from 'utils/datetime'
import { TooltipBuilder } from 'utils/echartUtils'
import { DefaultChart } from 'components'

export function TimeDistributionChart({ data }) {
  const dataAsArray = useMemo(() => {
    const percentiles = [50, 66, 75, 80, 90, 95, 99, 100]
    return percentiles.map(percentile => ({
      percentile,
      value: data[`p${percentile}`],
    }))
  }, [data])

  const options = useMemo(() => {
    return {
      tooltip: {
        axisPointer: {
          type: 'shadow',
        },

        formatter: data => {
          return new TooltipBuilder(data)
            .withDefaultHeader()
            .withDurationLine('Time')
            .getHtml()
        },
      },
      xAxis: {
        boundaryGap: true,
        type: 'category',
        data: dataAsArray.map(d => d.percentile),
        axisLabel: {
          formatter: value => `${value}%`,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: formatScaledDuration,
        },
      },
      series: [
        {
          name: 'Time',
          type: 'bar',
          barWidth: 20,
          data: dataAsArray.map(datum => datum.value),
        },
      ],
    }
  }, [dataAsArray])
  return <DefaultChart options={options} />
}
TimeDistributionChart.propTypes = {
  data: PropTypes.object,
}

export default TimeDistributionChart
