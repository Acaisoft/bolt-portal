import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import { Query } from 'react-apollo'

import { Loader } from '~components'

const GET_REPOSITORY_KEY = gql`
  query getRepositoryKey {
    testrun_repository_key
  }
`

export class RepositoryKey extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  }

  render() {
    const { children } = this.props

    return (
      <Query query={GET_REPOSITORY_KEY} fetchPolicy="cache-first">
        {({ data, loading, error }) => {
          if (loading) return <Loader loading fill />
          if (error) return <div>{error.message}</div>

          return children({ repositoryKey: data.testrun_repository_key })
        }}
      </Query>
    )
  }
}

export default RepositoryKey
