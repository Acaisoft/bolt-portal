import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import Authorized from './Authorized'
import Guest from './Guest'

import { AUTH_STATE_QUERY } from '~services/GraphQL/Store'

import styles from './Layout.styles'

export class Layout extends Component {
  static propTypes = {
    classes: PropTypes.object,
  }

  render() {
    const { classes } = this.props

    return (
      <Query query={AUTH_STATE_QUERY} fetchPolicy="cache-first">
        {({ data: { isAuthorized } }) => {
          return (
            <div className={classes.root}>
              {isAuthorized ? <Authorized /> : <Guest />}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(withStyles(styles)(Layout))
