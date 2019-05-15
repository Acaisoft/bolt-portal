import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import Authorized from './Authorized'
import Guest from './Guest'

import { AUTH_STATE_QUERY } from '~services/GraphQL/localState'

import styles from './Layout.styles'

export class Layout extends Component {
  static propTypes = {
    classes: PropTypes.object,
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <ToastContainer autoClose={8000} />
        <Query query={AUTH_STATE_QUERY} fetchPolicy="cache-first">
          {({ data: { isAuthorized } }) => {
            return (
              <div className={classes.root}>
                {isAuthorized ? <Authorized /> : <Guest />}
              </div>
            )
          }}
        </Query>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Layout))
