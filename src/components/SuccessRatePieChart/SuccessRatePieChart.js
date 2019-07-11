import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'
import ReactEcharts from 'echarts-for-react'

const rangeOfColors = [
  [90, '#32D4C0'],
  [75, '#AAD432'],
  [50, '#D4CD32'],
  [30, '#D48932'],
  [0, '#F76F40'],
]

function getColorsForValue(value) {
  for (let [threshold, color] of rangeOfColors) {
    if (value >= threshold) {
      return color
    }
  }
}

export function SuccessRatePieChart({ value, size = 100, variant = 'default' }) {
  const theme = useTheme()
  const defaultColors = [
    theme.palette.chart.color.area.error,
    theme.palette.chart.color.area.success,
  ]

  const colors =
    variant === 'multicolor' ? ['#42405E', getColorsForValue(value)] : defaultColors

  const data = [
    {
      name: 'Not finished',
      value: 100 - value,
    },
    {
      name: 'Done',
      value,
    },
  ]

  const options = useMemo(() => {
    return {
      color: colors,
      series: [
        {
          silent: true,
          clockwise: false,
          type: 'pie',
          label: {
            show: false,
          },
          radius: ['70%', '100%'],
          avoidLabelOverlap: false,
          data: data,
        },
      ],
    }
  }, [colors, data])

  return (
    <ReactEcharts
      option={options}
      opts={{
        renderer: 'canvas',
      }}
      style={{
        height: size,
        width: size,
      }}
    />
  )
}

SuccessRatePieChart.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
}

export default SuccessRatePieChart
