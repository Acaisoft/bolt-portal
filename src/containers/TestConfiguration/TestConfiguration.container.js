import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query, graphql, compose } from 'react-apollo'
import { GET_CONFIG_QUERY, RUN_TEST_SCENARIO, DELETE_TEST_SCENARIO } from './graphql'

export class TestConfiguration extends Component {
  static propTypes = {
    children: PropTypes.func,
    configurationId: PropTypes.string,
    deleteTestScenarioMutation: PropTypes.func.isRequired,
    runTestScenarioMutation: PropTypes.func.isRequired,
  }
  render() {
    const {
      children,
      configurationId,
      deleteTestScenarioMutation,
      runTestScenarioMutation,
    } = this.props
    return (
      <Query query={GET_CONFIG_QUERY} variables={{ configurationId }}>
        {({ loading, error, data }) =>
          children({
            loading,
            error,
            data: (data && data.configuration_by_pk) || {},
            runScenario: () =>
              runTestScenarioMutation({ variables: { configurationId } }),
            deleteScenario: () =>
              deleteTestScenarioMutation({
                variables: { configurationId },
              }),
          })
        }
      </Query>
    )
  }
}

export default compose(
  graphql(RUN_TEST_SCENARIO, {
    name: 'runTestScenarioMutation',
    options: {
      refetchQueries: ['getTestConfiguration'],
    },
  }),
  graphql(DELETE_TEST_SCENARIO, {
    name: 'deleteTestScenarioMutation',
    options: { refetchQueries: ['getTestConfigurations'] },
  })
)(TestConfiguration)
