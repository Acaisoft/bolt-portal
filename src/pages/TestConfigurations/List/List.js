import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'
import { TestConfigurationsList } from '~containers/lists'

import { getSubpageUrl } from '~utils/router'

import styles from './List.styles'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  redirectToSubpage = (relativePath, params = {}) => {
    const { history, match } = this.props

    history.push(getSubpageUrl(match, relativePath, params))
  }

  handleCreate = () => {
    this.redirectToSubpage('/create')
  }

  handleDetails = configuration => {
    this.redirectToSubpage('/:configurationId', {
      configurationId: configuration.id,
    })
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params

    return (
      <div className={classes.root}>
        <TestConfigurationsList
          projectId={projectId}
          showPagination
          onCreate={this.handleCreate}
          onDetails={this.handleDetails}
        />
      </div>
    )
  }
}

export default withStyles(styles)(List)
