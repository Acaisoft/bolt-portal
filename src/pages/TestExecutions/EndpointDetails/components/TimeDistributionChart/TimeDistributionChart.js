import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { withStyles } from '@material-ui/core'

import { formatThousands } from '~utils/numbers'

export function TimeDistributionChart({ data, theme }) {
  const { color, gridLine, font } = theme.palette.chart

  const dataAsArray = useMemo(() => {
    const percentiles = [50, 66, 75, 80, 90, 95, 99, 100]
    return percentiles.map(percentile => ({
      percentile,
      value: data[`p${percentile}`],
    }))
  }, [data])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={dataAsArray}
        margin={{
          top: 10,
          bottom: 0,
          right: 0,
          left: 60,
        }}
        barCategoryGap="20%"
        barGap={5}
        barSize={20}
      >
        <XAxis
          axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
          dataKey="percentile"
          type="category"
          tick={{ ...font }}
          tickFormatter={value => `${value}%`}
          name="Time Distribution"
        />
        <YAxis
          axisLine={{ strokeDasharray: gridLine.dash }}
          dataKey="value"
          name="Value"
          unit=" ms"
          tick={{ width: 130, ...font }}
        />

        <Tooltip
          isAnimationActive={false}
          cursor={false}
          wrapperStyle={{ ...font }}
          labelFormatter={label => `${label}th percentile`}
          formatter={value => `${formatThousands(value)} ms`}
        />

        <Bar
          {...font}
          stroke={color.area.primary}
          fill={color.area.primary}
          dataKey="value"
          name="Time"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
TimeDistributionChart.propTypes = {
  data: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(TimeDistributionChart)
