import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import { GET_CONFIG_QUERY } from './graphql'

export class TestConfiguration extends Component {
  static propTypes = {
    children: PropTypes.func,
    configurationId: PropTypes.string,
  }
  render() {
    const { children, configurationId } = this.props
    return (
      <Query query={GET_CONFIG_QUERY} variables={{ configurationId }}>
        {({ loading, error, data }) =>
          children({
            loading,
            error,
            data: data && data.configuration_by_pk,
          })
        }
      </Query>
    )
  }
}

export default TestConfiguration
