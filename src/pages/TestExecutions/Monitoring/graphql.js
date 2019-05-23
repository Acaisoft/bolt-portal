import gql from 'graphql-tag'

export const GET_EXECUTION_WITH_MONITORING_DATA = gql`
  query getExecutionWithMonitoringData($executionId: uuid!) {
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
