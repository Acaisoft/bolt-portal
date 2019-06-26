import { useEffect, useRef, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'

const LeaderLine = global.LeaderLine
export { LeaderLine }

function Line({ fromEl, toEl, options, refreshInterval = 10 }) {
  const instance = useRef(null)
  const defaultOptions = useDefaultOptions()

  // Initialize the line
  useEffect(() => {
    if (fromEl && toEl) {
      instance.current = new LeaderLine(fromEl, toEl, {
        ...defaultOptions,
        ...options,
      })
    }

    return () => {
      if (instance.current) {
        instance.current.remove()
      }
    }
  }, [defaultOptions, fromEl, options, toEl])

  useRepositionEffect({ instance, refreshInterval, fromEl, toEl })

  return null
}

Line.propTypes = {
  fromEl: PropTypes.instanceOf(Element),
  options: PropTypes.object,
  refreshInterval: PropTypes.number,
  toEl: PropTypes.instanceOf(Element),
}

function useDefaultOptions() {
  const theme = useTheme()
  const defaultOptions = useMemo(() => {
    const { line } = theme.palette.chart.graph

    return {
      color: line.default,
      size: 1,
      path: 'straight',
      startPlug: 'behind', // Hide the arrow behind the element
      endPlug: 'behind',
    }
  }, [theme.palette.chart.graph])

  return defaultOptions
}

function useRepositionEffect({ instance, refreshInterval, fromEl, toEl }) {
  const [fromTop, setFromTop] = useState(0)

  // Reposition the line when the element's offset changes.
  // We need to do it in intervals, because CSS transforms do not re-render the component.
  useEffect(() => {
    if (refreshInterval) {
      const handle = setInterval(() => {
        // React won't re-render after setting the same value.
        if (fromEl) {
          setFromTop(fromEl.offsetTop)
        }
      }, refreshInterval)

      return () => handle && clearInterval(handle)
    }
  }, [fromEl, instance, refreshInterval, toEl])

  useEffect(() => {
    if (instance.current) {
      instance.current.position()
    }
  }, [instance, fromTop])
}

export default Line
