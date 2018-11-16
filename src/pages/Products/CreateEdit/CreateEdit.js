import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class CreateEdit extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { match } = this.props
    const { id } = match.params

    return (
      <div>{id ? `Editing product with ID=${id}` : 'Creating a new product'}</div>
    )
  }
}

export default CreateEdit
