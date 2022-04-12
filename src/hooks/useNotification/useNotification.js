import React, { useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'
import { ToastSuccess, ToastError, ToastInfo } from 'assets/icons'
import { ToastContent } from './components'

const variants = {
  info: {
    defaultTitle: 'Information',
    icon: ToastInfo,
    name: 'info',
  },
  success: {
    defaultTitle: 'Success',
    icon: ToastSuccess,
    name: 'success',
  },
  error: {
    defaultTitle: 'Error',
    icon: ToastError,
    name: 'error',
  },
}

// @TODO: Possible optimization:
//        Rewrite as a context + useNotification hook which gets API from the context
function useNotification() {
  const success = useVariant(variants.success)
  const info = useVariant(variants.info)
  const error = useVariant(variants.error)

  // Preserve object identity between calls.
  return useMemo(
    () => ({
      success,
      info,
      error,
    }),
    [success, info, error]
  )
}

const useStyle = makeStyles(({ palette }) => {
  return {
    className: {
      borderRadius: 4,
      minHeight: 80,
      backgroundColor: ({ name }) => palette[name].main,
      color: ({ name }) => palette[name].contrastText,
    },
    progressClassName: {
      height: 7,
      background: 'rgba(255, 255, 255, 0.3)',
    },
  }
})

function useVariant({ name, defaultTitle, icon }) {
  const classes = useStyle({ name })

  return useCallback(
    (message, options = {}) => {
      const { title, ...toastifyOptions } = options

      toast[name](
        <ToastContent
          IconComponent={icon}
          message={message}
          title={title || defaultTitle}
        />,
        {
          ...toastifyOptions,
          ...classes,
        }
      )
    },
    [classes, defaultTitle, icon, name]
  )
}

export default useNotification
