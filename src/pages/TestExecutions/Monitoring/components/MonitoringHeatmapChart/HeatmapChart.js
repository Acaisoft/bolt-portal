import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@material-ui/styles'

function formatTooltip(params, ticket, callback) {
  const series = Array.isArray(params) ? params : [params]

  return `
<div style="padding: 16px;">
  <div>${series[0].name}</div>
  <ul style="margin: 8px; padding: 0; list-style: none">
  ${series
    .map((serie, index) => {
      return `
  <li style="margin: 0px; display: flex; flex-wrap: wrap; flex-grow: 1; flex-basis: 30%; align-items: center">
    <div style="margin-right: 4px;">${serie.marker}</div>
    <div style="font-weight: bold;">${serie.seriesName}</div>
    <div style="flex-basis: 100%; margin-left: 17px">${serie.value[2]}</div>
  </li>
    `
    })
    .join('\n')}
  </ul>
</div>
  `
}

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
        show: true,
        trigger: 'axis',
        backgroundColor: tooltip.fill,
        position: calculateTooltipPosition,
        textStyle: {
          color: font.color,
          fontFamily: font.fontFamily,
        },
        formatter: formatTooltip,
        extraCssText: 'border-radius: 0;',
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
