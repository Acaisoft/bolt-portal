import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Cell, PieChart, Pie, Text } from 'recharts'
import { withStyles } from '@material-ui/core'

export function SuccessRatePieChart({ classes, value, theme, size = 62.5 }) {
  const radius = Math.floor(size / 2)
  const colors = [
    theme.palette.chart.color.area.error,
    theme.palette.chart.color.area.success,
  ]
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
      if (index !== 1) return null

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
    [theme]
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
        innerRadius={radius - size * 0.08}
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
  classes: PropTypes.object,
  value: PropTypes.number,
  theme: PropTypes.object,
  size: PropTypes.number,
}

export default withStyles({}, { withTheme: true })(SuccessRatePieChart)
