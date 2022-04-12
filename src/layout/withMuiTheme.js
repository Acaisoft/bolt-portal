import React from 'react'
import { CssBaseline, MuiThemeProvider, createTheme } from '@material-ui/core'

import theme from 'config/theme'

const muiTheme = createTheme(theme)

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  console.info('theme', muiTheme)
}

const withMuiTheme = (Component, injectedTheme = muiTheme) => {
  const HOC = componentProps => (
    <MuiThemeProvider theme={injectedTheme}>
      <CssBaseline />
      <Component {...componentProps} />
    </MuiThemeProvider>
  )

  const name = Component.displayName || Component.name || ''
  HOC.displayName = `withMuiTheme(${name})`

  return HOC
}

export default withMuiTheme
