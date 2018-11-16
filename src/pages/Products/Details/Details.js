import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Details extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { match } = this.props
    const { id } = match.params

    return <div>Details of product with ID={id}</div>
  }
}

export default Details
