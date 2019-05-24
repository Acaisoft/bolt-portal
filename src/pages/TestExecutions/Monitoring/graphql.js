import gql from 'graphql-tag'

export const SUBSCRIBE_TO_EXECUTION_WITH_MONITORING_DATA = gql`
  subscription subscribeToExecutionWithMonitoringData($executionId: uuid!) {
    execution: execution_by_pk(id: $executionId) {
      id
      start
      start_locust

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
