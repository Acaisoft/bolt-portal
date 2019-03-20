import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getExecutionTimestampDomain } from '~utils/testExecutions'
import { formatDuration } from '~utils/datetime'

export class ChartTestExecutionResponseTime extends Component {
  static propTypes = {
    execution: PropTypes.object,
    results: PropTypes.array,
    syncId: PropTypes.string,
  }

  formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')
  formatResponseTime = responseTime => formatDuration(responseTime, 'mm:ss.SSS')

  render() {
    const { execution, results, syncId } = this.props

    const domainX = getExecutionTimestampDomain(execution)

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={results}
          margin={{
            top: 10,
            bottom: 30,
            right: 30,
            left: 30,
          }}
          syncId={syncId}
        >
          <XAxis
            dataKey="timestamp"
            name="Timestamp"
            tickFormatter={this.formatTimestamp}
            domain={domainX}
            type="number"
            label={{ value: 'Time', position: 'bottom' }}
          />
          <YAxis tickFormatter={this.formatResponseTime} />

          <Tooltip
            isAnimationActive={false}
            labelFormatter={this.formatTimestamp}
            formatter={(value, name, props) => `${value} ms`}
          />
          <Line
            type="linear"
            stroke="#4b8ef8"
            fill="#4b8ef8"
            dataKey="average_response_time"
            name="Avg. response time"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default ChartTestExecutionResponseTime
