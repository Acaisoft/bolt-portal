import React from 'react'
import PropTypes from 'prop-types'

import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'
import { useQuery } from 'react-apollo-hooks'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { Loader } from '~components'

import { AUTH_STATE_QUERY } from '~services/GraphQL/localState'

import Authorized from './Authorized'
import Guest from './Guest'

import styles from './Layout.styles'

export function Layout({ classes }) {
  const {
    data: { isAuthorized },
    loading,
  } = useQuery(AUTH_STATE_QUERY, {
    fetchPolicy: 'cache-first',
  })

  if (loading) {
    return <Loader loading />
  }

  return (
    <React.Fragment>
      <ToastContainer autoClose={8000} />
      <div className={classes.root}>{isAuthorized ? <Authorized /> : <Guest />}</div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  classes: PropTypes.object,
}

export default withRouter(withStyles(styles)(Layout))
