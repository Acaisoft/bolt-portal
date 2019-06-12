import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { withStyles } from '@material-ui/core'
import { ChartTooltip } from '~components'

import { Chart } from '~config/constants'
import { formatThousands } from '~utils/numbers'

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function RequestsChart({ data, execution, syncId, theme, domainX }) {
  const { color, gridLine, font } = theme.palette.chart

  return (
    <ResponsiveContainer width="100%" height={Chart.HEIGHT}>
      <AreaChart
        style={{ ...font }}
        data={data}
        margin={{
          top: 10,
          bottom: 30,
          right: 0,
          left: 10,
        }}
        syncId={syncId}
        reverseStackOrder
      >
        <CartesianGrid strokeDasharray={gridLine.dash} stroke={gridLine.color} />
        <XAxis
          axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
          dataKey="timestamp"
          name="Timestamp"
          tickFormatter={formatTimestamp}
          domain={domainX}
          type="number"
          tick={{ ...font }}
        />
        <YAxis
          axisLine={{ strokeDasharray: gridLine.dash }}
          tick={{ ...font }}
          tickFormatter={formatThousands}
          domain={['dataMin', 'dataMax']}
        />
        <Legend
          verticalAlign="bottom"
          iconType="square"
          wrapperStyle={{ paddingTop: 20 }}
        />

        <Tooltip
          content={<ChartTooltip />}
          isAnimationActive={false}
          labelFormatter={formatTimestamp}
          formatter={formatThousands}
        />
        <Area
          type="linear"
          stroke={color.area.error}
          fill={color.area.error}
          dataKey="number_of_fails"
          name="Fail"
          stackId={1}
        />
        <Area
          type="linear"
          stroke={color.area.success}
          fill={color.area.success}
          dataKey="number_of_successes"
          name="Success"
          stackId={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
RequestsChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(RequestsChart)
