import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Text } from 'recharts'

import { withStyles } from '@material-ui/core'

import { formatThousands, formatPercent } from '~utils/numbers'

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
  theme,
  total,
  activeColor,
}) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 12
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  const { gridLine, font } = theme.palette.chart

  return (
    <g>
      <Text
        x={cx}
        y={cy}
        textAnchor="middle"
        verticalAnchor="middle"
        width={100}
        {...font}
      >
        {`${formatThousands(payload.number_of_occurrences)}\n/ ${formatThousands(
          total
        )}\n${formatPercent(percent)}`}
      </Text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={activeColor}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 10}
        stroke={gridLine.color}
        strokeWidth={3}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={gridLine.color}
        fill="none"
      />
      <circle cx={sx} cy={sy} r={4} fill={activeColor} stroke="none" />
      <Text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        width={35}
        {...font}
      >
        {payload.exception_data}
      </Text>
    </g>
  )
}

export function FailuresChart({ data = [], theme }) {
  const { color } = theme.palette.chart

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback((data, index) => setActiveIndex(index))

  const totalErrors = useMemo(() => _.sumBy(data, 'number_of_occurrences'), [data])

  const getColor = useCallback(index => {
    const colors = [color.area.secondary]
    return colors[index % colors.length]
  }, [])

  const activeShapeRenderer = useCallback(
    props =>
      renderActiveShape({
        ...props,
        theme,
        total: totalErrors,
        activeColor: getColor(activeIndex),
      }),
    []
  )

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart margin={{ top: 20 }}>
          <Pie
            activeIndex={activeIndex}
            activeShape={activeShapeRenderer}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="70%"
            stroke="transparent"
            dataKey="number_of_occurrences"
            nameKey="exception_data"
            onMouseEnter={onPieEnter}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.id} fill={getColor(index)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
FailuresChart.propTypes = {
  data: PropTypes.array,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(React.memo(FailuresChart))
