import React, { useRef, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@material-ui/styles'
import _ from 'lodash'

function DefaultChart({ options: overridingOptions, syncGroup }) {
  const chartRef = useRef()
  useEffect(() => {
    if (syncGroup) {
      chartRef.current.getEchartsInstance().group = syncGroup
    }
  }, [syncGroup])

  const theme = useTheme()
  const { color, gridLine, font, tooltip } = theme.palette.chart

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

  const options = React.useMemo(() => {
    const defaultOptions = {
      legend: {
        show: false,
        x: 'center',
        y: 'bottom',
        textStyle: {
          color: font.color,
          fontFamily: font.fontFamily,
        },
      },
      color: lineColors,
      grid: {
        left: '3%',
        right: '4%',
        bottom:
          overridingOptions.legend && overridingOptions.legend.show ? 60 : '3%',
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
      },
      xAxis: {
        boundaryGap: false,
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
      textStyle: {
        color: font.color,
        fontFamily: font.fontFamily,
      },
    }

    return _.merge(defaultOptions, overridingOptions)
  }, [overridingOptions, font, gridLine, lineColors, tooltip])
  return (
    <ReactEcharts
      ref={chartRef}
      option={options}
      opts={{
        renderer: 'canvas',
        width: 'auto',
        height: 'auto',
      }}
    />
  )
}

export default DefaultChart
