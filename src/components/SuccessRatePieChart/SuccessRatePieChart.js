import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Cell, PieChart, Pie, Text } from 'recharts'
import { useTheme } from '@material-ui/styles'

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

export function SuccessRatePieChart({
  value,
  size = 62.5,
  variant = 'default',
  innerRadiusMultiplier = 0.08,
  showLabel = false,
}) {
  const theme = useTheme()
  const defaultColors = [
    theme.palette.chart.color.area.error,
    theme.palette.chart.color.area.success,
  ]

  const colors =
    variant === 'multicolor' ? ['#42405E', getColorsForValue(value)] : defaultColors

  const radius = Math.floor(size / 2)
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

  const customizedLabel = useCallback(
    ({ cx, cy, percent, index, ...rest }) => {
      if (index !== 1 || !showLabel) return null

      return (
        <Text
          textAnchor="middle"
          verticalAnchor="middle"
          x={cx}
          y={cy}
          {...theme.palette.chart.font}
          fill={theme.palette.text.primary}
          color={theme.palette.text.primary}
          fontWeight="bold"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </Text>
      )
    },
    [showLabel, theme.palette.chart.font, theme.palette.text.primary]
  )

  return (
    <PieChart width={size} height={size}>
      <Pie
        labelLine={false}
        stroke="none"
        isAnimationActive={false}
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        anglePadding={0}
        innerRadius={radius - size * innerRadiusMultiplier}
        outerRadius={radius}
        label={customizedLabel}
        startAngle={90}
        endAngle={450}
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={colors[index]} />
        ))}
      </Pie>
    </PieChart>
  )
}

SuccessRatePieChart.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
}

export default SuccessRatePieChart
