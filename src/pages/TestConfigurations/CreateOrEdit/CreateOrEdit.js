import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'

import ConfigurationForm from '../components/ConfigurationForm'

import styles from './CreateOrEdit.styles'

export class CreateOrEdit extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        configurationId: PropTypes.string,
        projectId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  handleCancel = () => {
    this.props.history.goBack()
  }

  handleSubmit = () => {
    const { history, match } = this.props
    let redirectUrl = match.url.split('/')
    redirectUrl.pop()
    redirectUrl = redirectUrl.join('/')
    history.push(redirectUrl)
  }

  render() {
    const { match } = this.props
    const { projectId, configurationId } = match.params
    return (
      <div>
        <ConfigurationForm
          projectId={projectId}
          configurationId={configurationId}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withStyles(styles)(CreateOrEdit)
