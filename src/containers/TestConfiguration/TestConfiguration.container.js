import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

export class TestConfiguration extends Component {
  static propTypes = {
    children: PropTypes.func,
    configurationId: PropTypes.string,
  }
  render() {
    const { children, configurationId } = this.props
    return (
      <Query query={GET_CONFIGS_QUERY} variables={{ configurationId }}>
        {({ loading, error, data }) =>
          children({
            loading,
            error,
            data: data && data.configuration && data.configuration[0],
          })
        }
      </Query>
    )
  }
}

export default TestConfiguration
