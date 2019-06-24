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
