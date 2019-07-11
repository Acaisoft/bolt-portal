import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core'

import ReactEcharts from 'echarts-for-react'
import { TooltipBuilder } from '~utils/echartUtils'

function formatLabel(params) {
  const label = _.truncate(params.name, { length: 20, omission: '...' })
  return `${label}`
}

export function FailuresChart({ data = [], theme }) {
  const { color, gridLine, tooltip, font } = theme.palette.chart

  const totalErrors = useMemo(() => _.sumBy(data, 'number_of_occurrences'), [data])

  const colors = [color.area.secondary, color.line.primary]

  const options = useMemo(() => {
    return {
      title: {
        top: 'center',
        left: 'center',
        text: `Total: ${totalErrors}`,
        textStyle: {
          color: font.color,
          fontFamily: font.fontFamily,
        },
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: tooltip.fill,
        textStyle: {
          color: font.color,
          fontFamily: font.fontFamily,
        },
        formatter: data => {
          return new TooltipBuilder(data).getTooltipForFailuresPieChart(totalErrors)
        },
      },
      grid: {
        containLabel: true,
      },
      color: colors,
      series: [
        {
          name: 'Failures',
          type: 'pie',
          radius: ['60%', '70%'],
          roseType: 'radius',
          hoverAnimation: false,
          label: {
            formatter: formatLabel,
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: gridLine.color,
              },
            },
          },
          itemStyle: {
            normal: {
              color: color.area.secondary,
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          data: data.map(datum => ({
            name: datum.exception_data,
            value: datum.number_of_occurrences,
          })),
        },
      ],
    }
  }, [data, color, colors, font, gridLine, tooltip, totalErrors])

  return (
    <ReactEcharts
      option={options}
      notMerge={true}
      opts={{
        renderer: 'canvas',
        width: 'auto',
        height: 'auto',
      }}
    />
  )
}
FailuresChart.propTypes = {
  data: PropTypes.array,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(FailuresChart)
