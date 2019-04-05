import React, { PureComponent } from 'react'
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

export class TestExecutionResponseTimeChart extends PureComponent {
  static propTypes = {
    execution: PropTypes.object,
    fontColor: PropTypes.string,
    results: PropTypes.array,
    syncId: PropTypes.string,
  }

  static defaultProps = {
    fontColor: '#CFCFEA',
  }

  formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

  render() {
    const { execution, fontColor, results, syncId } = this.props

    const domainX = getExecutionTimestampDomain(execution)

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={results}
          margin={{
            top: 10,
            bottom: 30,
            right: 0,
            left: 0,
          }}
          syncId={syncId}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#535273" />
          <XAxis
            axisLine={{ strokeDasharray: '5 5', stroke: '#535273' }}
            dataKey="timestamp"
            name="Timestamp"
            tickFormatter={this.formatTimestamp}
            domain={domainX}
            type="number"
            tick={{ fill: fontColor }}
          />
          <YAxis
            unit="ms"
            axisLine={{ strokeDasharray: '5 5', stroke: '#535273' }}
            tick={{ fill: fontColor }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="line"
            wrapperStyle={{ color: fontColor, paddingTop: 20 }}
          />

          <Tooltip
            isAnimationActive={false}
            labelFormatter={this.formatTimestamp}
            formatter={(value, name, props) => `${value} ms`}
          />
          <Line
            type="linear"
            stroke="#7297FF"
            fill="#7297FF"
            dataKey="average_response_time"
            name="Avg. response time"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default TestExecutionResponseTimeChart
