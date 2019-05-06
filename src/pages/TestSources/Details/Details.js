import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'

import styles from './Details.styles'

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        sourceId: PropTypes.string,
      }).isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { classes, match } = this.props
    const { sourceId } = match.params

    return (
      <div className={classes.root}>
        <Typography variant="body2">Here you see test source details</Typography>
        <div className={classes.tableContainer}>
          Test source details for {sourceId}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
