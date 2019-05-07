import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Text,
} from 'recharts'

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
      <Text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {`${formatThousands(payload.value)}\n/ ${formatThousands(total)}`}
      </Text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
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
      <circle cx={sx} cy={sy} r={4} fill={payload.color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={font.color}
      >
        {formatPercent(percent)}
      </text>
    </g>
  )
}

export function FailuresChart({ data, theme }) {
  const { color, font } = theme.palette.chart

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback((data, index) => setActiveIndex(index))
  const dataAsArray = useMemo(() => {
    return [
      {
        value: data.num_requests - data.num_failures,
        label: 'Successes',
        color: color.area.success,
      },
      {
        value: data.num_failures,
        label: 'Failures',
        color: color.area.error,
      },
    ]
  }, [data])

  const activeShapeRenderer = useCallback(
    props => renderActiveShape({ ...props, theme, total: data.num_requests }),
    []
  )

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={activeShapeRenderer}
            data={dataAsArray}
            cx="50%"
            cy="50%"
            innerRadius={72}
            outerRadius={80}
            stroke="transparent"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {dataAsArray.map((entry, index) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
          </Pie>

          <Legend
            formatter={(value, entry) => entry.payload.label}
            iconType="circle"
            wrapperStyle={{ color: font.color, paddingTop: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
FailuresChart.propTypes = {
  data: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(FailuresChart)
