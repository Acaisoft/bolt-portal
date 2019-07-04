import React, { useCallback, useMemo } from 'react'
import moment from 'moment'

import filesize from 'filesize'
import { formatThousands, formatPercent } from '~utils/numbers'

import ReactEcharts from 'echarts-for-react'
import { withStyles } from '@material-ui/styles'

const formatters = {
  kBytes: {
    axis: value => filesize(value, { round: 3 }),
    tooltip: value => filesize(value, { round: 3 }),
  },
  bytes: {
    axis: value => filesize(value, { round: 2, exponent: 3 }),
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

function calculateTooltipPosition(mouse, params, dom, rect, size) {
  const [offsetX, offsetY] = [10, 10]

  const [mouseX, mouseY] = mouse
  const [viewX, viewY] = size.viewSize
  const { offsetWidth: width, offsetHeight: height } = dom
  const fitsX = mouseX + width < viewX
  const fitsY = mouseY + height < viewY

  return {
    top: fitsY ? mouseY + offsetY : mouseY - height - offsetY,
    left: fitsX ? mouseX + offsetX : mouseX - width - offsetX,
  }
}

export function LineChart({ data, config, groupNames, theme }) {
  const { color, gridLine, font, tooltip } = theme.palette.chart

  const maxValue = useMemo(() => {
    const values = []

    groupNames.forEach(groupName => {
      data.forEach(datum => {
        values.push(datum.groups[groupName])
      })
    })

    return Math.max(...values)
  }, [data, groupNames])

  const lineColors = [
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

  const formatTooltip = useCallback(
    params => {
      const series = Array.isArray(params) ? params : [params]

      return `
<div style="padding: 16px;">
  <div>${series[0].name}</div>
  <ul style="margin: 8px; padding: 0; list-style: none">
  ${series
    .map((serie, index) => {
      const formatedValue = formatters[config.y_format].tooltip(serie.value)

      return `
  <li style="margin: 0px; display: flex; flex-wrap: wrap; flex-grow: 1; flex-basis: 30%; align-items: center">
    <div style="margin-right: 4px;">${serie.marker}</div>
    <div style="font-weight: bold;">${serie.seriesName}</div>
    <div style="flex-basis: 100%; margin-left: 17px">${formatedValue}</div>
  </li>
    `
    })
    .join('\n')}
  </ul>
</div>
  `
    },
    [config]
  )

  const options = React.useMemo(() => {
    return {
      legend: {
        show: false,
      },
      color: lineColors,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: tooltip.fill,
        textStyle: {
          color: font.color,
          fontFamily: font.fontFamily,
        },
        formatter: formatTooltip,
        position: calculateTooltipPosition,
      },
      xAxis: {
        boundaryGap: false,
        type: 'category',
        data: data.map(d => formatTimestamp(d.timestamp)),
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: gridLine.color,
          },
        },
        axisLine: {
          lineStyle: {
            color: gridLine.color,
          },
        },
      },
      yAxis: {
        min: config.y_format === 'percent' ? 0 : null,
        max: config.y_format === 'percent' ? 1 : null,
        interval: maxValue === 0 && config.y_format === 'number' ? 1 : null,
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: gridLine.color,
          },
        },
        axisLine: {
          lineStyle: {
            color: gridLine.color,
          },
        },
        axisLabel: {
          formatter: formatters[config.y_format].axis,
        },
      },
      textStyle: {
        color: font.color,
        fontFamily: font.fontFamily,
      },
      series: groupNames.map((groupName, groupIndex) => {
        return {
          name: groupName,
          type: 'line',
          showSymbol: false,
          animation: false,
          data: data.map((datum, datumIndex) => {
            return datum.groups[groupName]
          }),
        }
      }),
    }
  }, [
    data,
    config,
    font,
    gridLine,
    lineColors,
    tooltip,
    groupNames,
    formatTooltip,
    maxValue,
  ])

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

export default withStyles({}, { withTheme: true })(LineChart)
