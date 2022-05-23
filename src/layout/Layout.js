import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'
import { useAuth } from 'contexts/AuthContext'

import { CloseToast } from 'assets/icons'
import Authorized from './Authorized'
import Guest from './Guest'
import Splash from './Splash'

import useStyles from './Layout.styles'

export function Layout() {
  const classes = useStyles()
  const { isAuthenticated, isInitialized } = useAuth()

  function CloseButton({ closeToast }) {
    return <CloseToast onClick={closeToast} className={classes.closeIcon} />
  }

  return (
    <React.Fragment>
      <ToastContainer
        className={classes.toastContainer}
        autoClose={8000}
        closeButton={<CloseButton />}
        theme="colored"
      />
      <div className={classes.root}>
        {isInitialized ? isAuthenticated ? <Authorized /> : <Guest /> : <Splash />}
      </div>
    </React.Fragment>
  )
}

export default Layout
