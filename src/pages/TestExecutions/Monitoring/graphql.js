import gql from 'graphql-tag'

export const SUBSCRIBE_TO_EXECUTION_WITH_MONITORING_DATA = gql`
  subscription subscribeToExecutionWithMonitoringData($executionId: uuid!) {
    execution: execution_by_pk(id: $executionId) {
      id
      start
      start_locust
      status
      argo_name

      configuration {
        id
        has_load_tests
        has_monitoring
      }

      execution_metrics_data(order_by: { timestamp: asc }) {
        id
        timestamp
        data
      }

      execution_metrics_metadata {
        id
        chart_configuration
      }
    }
  }
`
