import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { AuthContext } from '~contexts'

import Authorized from './Authorized'
import Guest from './Guest'
import Splash from './Splash'

import styles from './Layout.styles'

export function Layout({ classes }) {
  const { isAuthenticated, isInitialized } = useContext(AuthContext)

  return (
    <React.Fragment>
      <ToastContainer autoClose={8000} />
      <div className={classes.root}>
        {isInitialized ? isAuthenticated ? <Authorized /> : <Guest /> : <Splash />}
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  classes: PropTypes.object,
}

export default withRouter(withStyles(styles)(Layout))
