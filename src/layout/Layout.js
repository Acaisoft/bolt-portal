import React, { useContext } from 'react'

import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { AuthKeycloakContext } from '~contexts'

import { CloseToast } from '~assets/icons'
import Authorized from './Authorized'
import Guest from './Guest'
import Splash from './Splash'

import useStyles from './Layout.styles'

export function Layout() {
  const classes = useStyles()
  const { isAuthenticated, isInitialized } = useContext(AuthKeycloakContext)

  function CloseButton({ closeToast }) {
    return <CloseToast onClick={closeToast} className={classes.closeIcon} />
  }

  return (
    <React.Fragment>
      <ToastContainer autoClose={8000} closeButton={<CloseButton />} />
      <div className={classes.root}>
        {isInitialized ? isAuthenticated ? <Authorized /> : <Guest /> : <Splash />}
      </div>
    </React.Fragment>
  )
}

export default withRouter(Layout)
