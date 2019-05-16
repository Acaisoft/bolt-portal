import gql from 'graphql-tag'

export const SUBSCRIBE_TO_PROJECTS = gql`
  subscription subscribeToProjectsForSelector {
    projects: project(
      where: { is_deleted: { _eq: false } }
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`
export const SUBSCRIBE_TO_SCENARIOS = gql`
  subscription subscribeToScenariosForSelector($projectId: uuid!) {
    configurations: configuration(
      where: { project_id: { _eq: $projectId }, is_deleted: { _eq: false } }
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`
export const SUBSCRIBE_TO_EXECUTIONS = gql`
  subscription subscribeToScenariosForSelector($configurationId: uuid!) {
    executions: execution(
      where: {
        configuration_id: { _eq: $configurationId }
        is_deleted: { _eq: false }
      }
      order_by: { start_locust: desc, start: desc }
    ) {
      id
      start
      start_locust
    }
  }
`
