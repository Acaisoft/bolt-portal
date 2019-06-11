import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { withStyles } from '@material-ui/core'

import filesize from 'filesize'
import { formatThousands, formatPercent } from '~utils/numbers'
import { SectionHeader } from '~components'

import ChartFilter from '../ChartFilter'

const formatters = {
  bytes: {
    axis: value => filesize(value, { round: 0, exponent: 3 }),
    tooltip: value => filesize(value, { round: 3 }),
  },
  number: {
    axis: value => formatThousands(value),
    tooltip: value => formatThousands(value),
  },
  percent: {
    axis: value => formatPercent(value, 0),
    tooltip: value => formatPercent(value, 2),
  },
}

const formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

export function MonitoringLineChart({ config, data, groupNames, theme }) {
  const { color, gridLine, font, tooltip } = theme.palette.chart

  // TODO: Assign better colors
  const lineColors = [
    color.line.primary,
    color.line.secondary,
    color.line.error,
    'green',
    'red',
    'blue',
    'violet',
    'orange',
    'pink',
  ]

  const [selected, setSelected] = useState([...groupNames])

  return (
    <React.Fragment>
      <SectionHeader title={config.title} size="small" marginBottom>
        <ChartFilter
          groupNames={groupNames}
          onChange={evt => setSelected(evt.target.value)}
          selected={selected}
        />
      </SectionHeader>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          style={{ ...font }}
          data={data}
          margin={{
            top: 10,
            bottom: 30,
            right: 0,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray={gridLine.dash} stroke={gridLine.color} />
          <XAxis
            axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
            type={config.x_format}
            dataKey={config.x_data_key}
            name={config.x_label}
            tickFormatter={formatTimestamp}
            tick={{ ...font, fontSize: 12 }}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            axisLine={{ strokeDasharray: gridLine.dash }}
            tick={{ ...font, fontSize: 12 }}
            tickFormatter={formatters[config.y_format].axis}
            domain={['dataMin', 'dataMax']}
          />

          <Tooltip
            isAnimationActive={false}
            labelFormatter={formatTimestamp}
            formatter={formatters[config.y_format].tooltip}
            wrapperStyle={{ ...tooltip, zIndex: 1 }}
          />

          {selected.map((groupName, index) => {
            const lineColor = lineColors[index % lineColors.length]

            return (
              <Line
                key={groupName}
                type="linear"
                strokeWidth={2}
                stroke={lineColor}
                fill={lineColor}
                dataKey={tick => tick.groups[groupName]}
                name={groupName}
                dot={false}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
MonitoringLineChart.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  groupNames: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(MonitoringLineChart)
