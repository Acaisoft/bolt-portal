import React, { useCallback } from 'react'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'
import { ToastSuccess, ToastError, ToastInfo } from '~assets/icons'
import { ToastContent } from './components'

const variants = [
  {
    name: 'info',
    defaultTitle: 'Information',
    color: '#7297FF',
    icon: ToastInfo,
  },
  {
    name: 'success',
    defaultTitle: 'Success',
    color: '#1EB1B1',
    icon: ToastSuccess,
  },
  {
    name: 'error',
    defaultTitle: 'Error',
    color: '#EB6767F',
    icon: ToastError,
  },
]

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

function createVariant({ name, defaultTitle, icon }) {
  const toastVariantMethod = useCallback((message, options = {}) => {
    const { title, ...toastifyOptions } = options
    const classes = useStyle({ name })

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
  }, [])

  return toastVariantMethod
}

function useNotification() {
  return {
    success: createVariant({
      name: 'success',
      defaultTitle: 'Success',
      icon: ToastSuccess,
    }),
    info: createVariant({
      name: 'info',
      defaultTitle: 'Information',
      icon: ToastInfo,
    }),
    error: createVariant({ name: 'error', defaultTitle: 'Error', icon: ToastError }),
  }
}

export default useNotification
