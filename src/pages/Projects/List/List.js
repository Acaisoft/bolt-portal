import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ProjectsList } from './components'

import { getSubpageUrl } from '~utils/router'

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
    const { history, match } = this.props
    history.push(getSubpageUrl(match, '/:projectId', { projectId: id }))
  }

  render() {
    return <ProjectsList onDetails={this.handleDetails} />
  }
}

export default List
