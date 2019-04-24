import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getExecutionTimestampDomain } from '~utils/testExecutions'
import { withStyles } from '@material-ui/core'

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function ResponseTimeChart({ data, execution, syncId, theme }) {
  const backgroundColor = theme.palette.background.paper
  const { color, gridLine, font } = theme.palette.chart

  const domainX = getExecutionTimestampDomain(execution)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          bottom: 30,
          right: 0,
          left: 0,
        }}
        syncId={syncId}
      >
        <CartesianGrid strokeDasharray={gridLine.dash} stroke={gridLine.color} />
        <XAxis
          axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
          dataKey="timestamp"
          name="Timestamp"
          tickFormatter={formatTimestamp}
          domain={domainX}
          type="number"
          tick={{ fill: font.color }}
        />
        <YAxis
          unit="ms"
          axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
          tick={{ fill: font.color }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="line"
          wrapperStyle={{ color: font.color, paddingTop: 20 }}
        />

        <Tooltip
          isAnimationActive={false}
          labelFormatter={formatTimestamp}
          formatter={(value, name, props) => `${value} ms`}
        />
        <Line
          type="linear"
          stroke={color.line.primary}
          fill={color.line.primary}
          dataKey="average_response_time"
          name="Avg. response time"
          dot={{ r: 2, strokeWidth: 1, fill: backgroundColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
ResponseTimeChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
}

export default withStyles({}, { withTheme: true })(ResponseTimeChart)
