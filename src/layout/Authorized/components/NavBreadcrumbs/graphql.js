import gql from 'graphql-tag'

export const GET_PROJECTS = gql`
  query getProjectsForSelector {
    project(order_by: { name: asc }) {
      id
      name
    }
  }
`
export const GET_SCENARIOS = gql`
  query getScenariosForSelector($projectId: uuid!) {
    configuration(
      where: { project_id: { _eq: $projectId } }
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`
export const GET_EXECUTIONS = gql`
  query getScenariosForSelector($configurationId: uuid!) {
    execution(
      where: { configuration_id: { _eq: $configurationId } }
      order_by: { start: asc, start_locust: asc }
    ) {
      id
      start
      start_locust
    }
  }
`
