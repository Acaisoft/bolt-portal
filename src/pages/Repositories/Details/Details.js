import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'
import { RepositoriesList } from '~containers/lists'

import styles from './Details.styles'

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        repositoryId: PropTypes.string,
      }).isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { classes, match } = this.props
    const { repositoryId } = match.params

    return (
      <div className={classes.root}>
        <Typography variant="body2">Here you see repository details</Typography>
        <div className={classes.tableContainer}>
          Repository details for {repositoryId}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
