import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { withStyles } from '@material-ui/core'

import filesize from 'filesize'
import { formatThousands, formatPercent } from '~utils/numbers'

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

  const {
    hoveredItemIndex,
    clickedItemIndex,
    handleLegendMouseEnter,
    handleLegendMouseLeave,
    handleLegendClick,
  } = useLegendHandlers(groupNames)

  return (
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

        <Legend
          layout="vertical"
          verticalAlign="top"
          align="right"
          iconType="plainline"
          wrapperStyle={{
            marginLeft: 70,
            marginBottom: 30,
            paddingLeft: 20,
            paddingRight: 30,
            width: 300,
            height: 230,
            overflow: 'auto',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
          onMouseEnter={handleLegendMouseEnter}
          onMouseLeave={handleLegendMouseLeave}
          onClick={handleLegendClick}
        />

        {groupNames.map((groupName, index) => {
          const lineColor = lineColors[index % lineColors.length]

          const isVisible =
            clickedItemIndex === index ||
            hoveredItemIndex === index ||
            (clickedItemIndex === -1 && hoveredItemIndex === -1)

          return (
            <Line
              key={groupName}
              type="linear"
              strokeWidth={2}
              stroke={lineColor}
              strokeOpacity={isVisible ? 1 : 0.1}
              fill={lineColor}
              dataKey={tick => tick.groups[groupName]}
              name={groupName}
              dot={false}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
MonitoringLineChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  syncId: PropTypes.string,
  theme: PropTypes.object.isRequired,
}

function useLegendHandlers(groupNames) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState(-1)
  const [clickedItemIndex, setClickedItemIndex] = useState(-1)

  const getGroupIndex = useCallback(name => groupNames.indexOf(name), [groupNames])

  const handleLegendMouseEnter = useCallback(
    item => {
      setHoveredItemIndex(getGroupIndex(item.value))
    },
    [clickedItemIndex]
  )
  const handleLegendMouseLeave = useCallback(
    item => {
      setHoveredItemIndex(-1)
    },
    [clickedItemIndex]
  )
  const handleLegendClick = useCallback(
    item => {
      const selectedIndex = getGroupIndex(item.value)
      if (clickedItemIndex === selectedIndex) {
        setClickedItemIndex(-1)
      } else {
        setClickedItemIndex(selectedIndex)
      }
    },
    [clickedItemIndex]
  )

  return {
    hoveredItemIndex,
    clickedItemIndex,
    handleLegendMouseEnter,
    handleLegendMouseLeave,
    handleLegendClick,
  }
}

export default withStyles({}, { withTheme: true })(MonitoringLineChart)
