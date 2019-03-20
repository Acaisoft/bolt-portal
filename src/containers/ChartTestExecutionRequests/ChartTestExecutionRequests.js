import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  AreaChart,
  Area,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getExecutionTimestampDomain } from '~utils/testExecutions'

export class ChartTestExecutionRequests extends Component {
  static propTypes = {
    execution: PropTypes.object,
    results: PropTypes.array,
  }

  formatTimestamp = timestamp => moment(timestamp).format('HH:mm:ss')

  render() {
    const { execution, results, syncId } = this.props

    const domainX = getExecutionTimestampDomain(execution)

    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
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
          <YAxis />
          <Legend verticalAlign="top" iconType="rect" />

          <Tooltip isAnimationActive={false} labelFormatter={this.formatTimestamp} />
          <Area
            type="linear"
            stroke="#e6978e"
            fill="#e6978e"
            dataKey="number_of_fails"
            name="Fail"
            stackId={1}
          />
          <Area
            type="linear"
            stroke="#399839"
            fill="#399839"
            dataKey="number_of_successes"
            name="Success"
            stackId={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default ChartTestExecutionRequests
