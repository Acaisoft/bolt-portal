import React, { useMemo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core'

import ReactEcharts from 'echarts-for-react'
import { TooltipBuilder } from '~utils/echartUtils'
import ReactResizeDetector from 'react-resize-detector'

export function FailuresChart({ data = [], theme }) {
  const { color, gridLine, tooltip, font } = theme.palette.chart

  const totalErrors = useMemo(() => _.sumBy(data, 'number_of_occurrences'), [data])

  const [trimLength, setTrimLength] = useState()

  const getTrimLength = useCallback(width => {
    const rangeOfTrim = [
      [700, 45],
      [600, 35],
      [500, 25],
      [450, 20],
      [400, 15],
      [350, 10],
      [320, 8],
      [300, 7],
      [250, 5],
    ]

    for (let [step, trim] of rangeOfTrim) {
      if (width >= step) {
        setTrimLength(trim)
        break
      }
    }
  }, [])

  const formatLabel = useCallback(
    params => {
      const label = _.truncate(params.name, {
        length: trimLength,
        omission: '...',
      })
      return `${label}`
    },
    [trimLength]
  )

  const colors = [
    color.area.secondary,
    color.line.primary,
    color.line.success,
    color.line.error,
    'green',
    'red',
    'blue',
    'violet',
    'orange',
    'pink',
  ]

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
      color: colors,
      series: [
        {
          name: 'Failures',
          type: 'pie',
          radius: ['60%', '70%'],
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
          data: data.map(datum => ({
            name: datum.exception_data,
            value: datum.number_of_occurrences,
          })),
        },
      ],
    }
  }, [data, colors, font, gridLine, tooltip, totalErrors, formatLabel])

  return (
    <React.Fragment>
      <ReactEcharts
        option={options}
        notMerge={true}
        opts={{
          renderer: 'canvas',
          width: 'auto',
          height: 'auto',
        }}
      />
      <ReactResizeDetector
        handleWidth
        onResize={width => getTrimLength(width)}
        refreshRate={200}
        refreshMode="debounce"
      />
    </React.Fragment>
  )
}
FailuresChart.propTypes = {
  data: PropTypes.array,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(FailuresChart)
