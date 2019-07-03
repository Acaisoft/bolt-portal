import gql from 'graphql-tag'

export const GET_METRICS_DATA_CONFIG = gql`
  query getMetricsDataConfig($executionId: uuid!) {
    execution: execution_by_pk(id: $executionId) {
      id
      configuration {
        id
        has_load_tests
        has_monitoring
      }
      execution_metrics_metadata {
        chart_configuration
      }
    }
  }
`

export const GET_METRICS_DATA = gql`
  query getMetricsData($executionId: UUID!) {
    metrics_data_by_execution_id(execution_id: $executionId) {
      metrics_data {
        data
      }
    }
  }
`
