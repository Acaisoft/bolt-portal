import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@material-ui/styles'
import { TooltipBuilder } from '~utils/echartUtils'

function getVisualMapForFormat({ yFormat, activeColor, theme, legendLabels }) {
  const {
    chart: { color, font },
  } = theme.palette

  if (yFormat === 'bool') {
    return {
      show: true,
      type: 'piecewise',
      min: 0,
      max: 1,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      splitNumber: 2,
      textStyle: font.color,
      pieces: [
        {
          value: 0,
          label: legendLabels[0] || 'false',
          color: color.heatmap.bool.inactive,
        },
        {
          value: 1,
          label: legendLabels[1] || 'true',
          color: activeColor || color.heatmap.bool.active,
        },
      ],
    }
  }

  return { type: 'continuous' }
}

function HeatmapChart({
  activeColor,
  legendLabels,
  options: overridingOptions,
  yFormat,
}) {
  const theme = useTheme()

  const options = React.useMemo(() => {
    const {
      chart: { font, slider, tooltip },
    } = theme.palette

    const defaultOptions = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: tooltip.fill,
        textStyle: {
          color: font.color,
          fontFamily: font.fontFamily,
        },
        formatter: data => {
          return new TooltipBuilder(data).getTooltipForMonitoring('heatmap')
        },
      },
      textStyle: {
        color: font.color,
        fontFamily: font.fontFamily,
      },
      grid: {
        height: '50%',
        y: '10%',
      },
      visualMap: getVisualMapForFormat({
        yFormat,
        activeColor,
        theme,
        legendLabels,
      }),
      dataZoom: [
        {
          type: 'slider',
          show: true,
          borderColor: slider.border,
          fillerColor: slider.background,
          handleStyle: {
            borderColor: slider.border,
          },
        },
        {
          type: 'inside',
        },
      ],
    }

    return _.merge(defaultOptions, overridingOptions)
  }, [activeColor, legendLabels, overridingOptions, theme, yFormat])

  return (
    <ReactEcharts
      option={options}
      opts={{
        renderer: 'canvas',
        width: 'auto',
        height: 'auto',
      }}
    />
  )
}

HeatmapChart.propTypes = {
  activeColor: PropTypes.string,
  legendLabels: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.object,
  yFormat: PropTypes.oneOf(['bool', 'number']),
}

export default HeatmapChart
