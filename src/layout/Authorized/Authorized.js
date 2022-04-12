import React from 'react'

import { CssBaseline } from '@material-ui/core'

import AuthorizedPages from 'pages/Authorized'

import TopBar from './components/TopBar'
import useStyles from './Authorized.styles'

export function Authorized() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <CssBaseline />
        <TopBar />
      </div>
      <main className={classes.content}>
        <AuthorizedPages />
      </main>
    </div>
  )
}

export default Authorized
