import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'
import { withStyles } from '@material-ui/core'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import { TestConfigurationsList } from './components'
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

  redirectToPage = (path, params = {}) => {
    const { history, match } = this.props
    history.push(getUrl(path, { ...match.params, ...params }))
  }

  handleCreate = () => {
    this.redirectToPage(routes.projects.configurations.create)
  }

  handleDetails = configuration => {
    this.redirectToPage(routes.projects.configurations.details, {
      configurationId: configuration.id,
    })
  }

  handleRun = ({ configuration, error }) => {
    if (error) {
      toast.error(error)
    } else {
      toast.success(`Scenario '${configuration.name}' was successfully started.`)
    }
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params

    return (
      <div className={classes.root}>
        <TestConfigurationsList
          projectId={projectId}
          onCreate={this.handleCreate}
          onDetails={this.handleDetails}
          onRun={this.handleRun}
        />
      </div>
    )
  }
}

export default withStyles(styles)(List)
