import React from 'react'
import PropTypes from 'prop-types'
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { withStyles } from '@material-ui/core'
import { trimText } from '~utils/strings'
import { formatThousands } from '~utils/numbers'

export function RequestsPerSecondChart({ data, execution, theme }) {
  const { color, gridLine, font, tooltip } = theme.palette.chart

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        style={{ ...font }}
        data={data}
        margin={{
          top: 10,
          bottom: 30,
          right: 0,
          left: 70,
        }}
        layout="vertical"
        barCategoryGap="20%"
        barGap={5}
        barSize={20}
      >
        <CartesianGrid strokeDasharray={gridLine.dash} stroke={gridLine.color} />
        <XAxis
          axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
          scale="linear"
          type="number"
          tick={{ ...font }}
          tickFormatter={formatThousands}
        />
        <YAxis
          axisLine={{ strokeDasharray: gridLine.dash }}
          dataKey="name"
          name="Name"
          type="category"
          tickFormatter={label => trimText(label, 15)}
          tick={{ width: 140, ...font }}
        />

        <Tooltip
          isAnimationActive={false}
          cursor={false}
          formatter={formatThousands}
          wrapperStyle={{ ...tooltip }}
        />

        <Bar
          stroke={color.area.primary}
          fill={color.area.primary}
          dataKey="requests_per_second"
          name="Requests/s"
          stackId={1}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
RequestsPerSecondChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(RequestsPerSecondChart)
