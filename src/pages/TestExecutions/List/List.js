import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'
import { TestExecutionsList } from '~containers/lists'

import styles from './List.styles'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
      params: PropTypes.shape({
        projectId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  handleDetails = execution => {
    const { history, match } = this.props
    history.push(`${match.url}/${execution.id}`)
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in all of your projects
        </Typography>
        <div className={classes.tableContainer}>
          <TestExecutionsList projectId={projectId} onDetails={this.handleDetails} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(List)
