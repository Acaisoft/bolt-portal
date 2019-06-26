import gql from 'graphql-tag'

const EXECUTION_TIME_PARAMETER_FRAGMENT = gql`
  fragment executionTimeParameter on execution {
    configuration {
      id
      has_monitoring
      configuration_parameters(where: { parameter: { name: { _eq: "time" } } }) {
        id
        value
      }
    }
  }
`

export const SUBSCRIBE_TO_EXECUTION = gql`
  subscription subscribeToExecution($executionId: uuid!) {
    execution: execution_by_pk(id: $executionId) {
      id
      start
      start_locust
      end_locust
      argo_name
      status
      configuration {
        id
        name
      }
      ...executionTimeParameter
    }
  }

  ${EXECUTION_TIME_PARAMETER_FRAGMENT}
`

export const SUBSCRIBE_TO_EXECUTION_STATUS = gql`
  subscription subscribeToExecutionStatus($executionId: uuid!) {
    execution_stage_log(
      where: { execution_id: { _eq: $executionId } }
      order_by: { timestamp: desc }
    ) {
      msg
      level
      stage
      timestamp
    }
  }
`

export const GET_GRAPH_CONFIGURATION = gql`
  query getTestConfiguration($configurationId: uuid!) {
    configuration: configuration_by_pk(id: $configurationId) {
      id
      has_monitoring
      has_post_test
      has_pre_test
      has_load_tests
    }
  }
`
