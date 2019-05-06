import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ProjectsList } from './components'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

export class List extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  handleDetails = ({ id }) => {
    const { history } = this.props
    history.push(getUrl(routes.projects.details, { projectId: id }))
  }

  render() {
    return <ProjectsList onDetails={this.handleDetails} />
  }
}

export default List
