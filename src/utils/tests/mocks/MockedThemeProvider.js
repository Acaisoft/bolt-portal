import React from 'react'
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import theme from '~config/theme'

const muiTheme = createMuiTheme(theme)

function MockedThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default MockedThemeProvider
