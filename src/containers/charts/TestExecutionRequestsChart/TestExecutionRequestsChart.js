import React, { PureComponent } from 'react'
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

import { getExecutionTimestampDomain } from '~utils/testExecutions'

export class TestExecutionRequestsChart extends PureComponent {
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
    const { execution, results, syncId, fontColor } = this.props

    const domainX = getExecutionTimestampDomain(execution)

    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={results}
          margin={{
            top: 10,
            bottom: 30,
            right: 0,
            left: 0,
          }}
          syncId={syncId}
          reverseStackOrder
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
          <YAxis axisLine={{ strokeDasharray: '5 5' }} tick={{ fill: fontColor }} />
          <Legend
            verticalAlign="bottom"
            iconType="square"
            wrapperStyle={{ color: fontColor, paddingTop: 20 }}
          />

          <Tooltip isAnimationActive={false} labelFormatter={this.formatTimestamp} />
          <Area
            type="linear"
            stroke="#FF5EA1"
            fill="#FF5EA1"
            dataKey="number_of_fails"
            name="Errors"
            stackId={1}
          />
          <Area
            type="linear"
            stroke="#1EB1B1"
            fill="#1EB1B1"
            dataKey="number_of_successes"
            name="Success"
            stackId={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default TestExecutionRequestsChart
