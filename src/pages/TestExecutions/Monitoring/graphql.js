import { gql } from '@apollo/client'

export const SUBSCRIBE_TO_EXECUTION_WITH_MONITORING_DATA = gql`
  subscription getMetricsDataConfig($executionId: uuid!) {
    execution: execution_by_pk(id: $executionId) {
      id
      start
      start_locust
      status
      argo_name
      configuration_snapshot

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
    monitoring: metrics_data_by_execution_id(execution_id: $executionId) {
      metrics_data {
        data
      }
    }
  }
`
