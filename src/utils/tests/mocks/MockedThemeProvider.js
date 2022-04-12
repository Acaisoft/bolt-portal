import React from 'react'
import { CssBaseline, MuiThemeProvider, createTheme } from '@material-ui/core'

import theme from 'config/theme'

const muiTheme = createTheme(theme)

function MockedThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default MockedThemeProvider
