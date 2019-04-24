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

export function UsersSpawnChart({ data, execution, syncId, theme }) {
  const backgroundColor = theme.palette.background.paper
  const { color, font, gridLine } = theme.palette.chart

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
          axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
          tick={{ fill: font.color }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="line"
          wrapperStyle={{ color: font.color, paddingTop: 20 }}
        />

        <Tooltip isAnimationActive={false} labelFormatter={formatTimestamp} />
        <Line
          type="linear"
          stroke={color.line.primary}
          fill={color.line.primary}
          dataKey="number_of_users"
          name="Users Spawn"
          dot={{ r: 2, strokeWidth: 1, fill: backgroundColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
UsersSpawnChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(UsersSpawnChart)
