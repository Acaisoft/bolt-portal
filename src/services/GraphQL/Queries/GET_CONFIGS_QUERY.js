import gql from 'graphql-tag'
export default gql(`
query getTestConfigurations($projectId: uuid) {
    configuration(where: {project_id: {_eq: $projectId}}) {
      id
      name
      executions {
        start
      }
      repository {
        url
      }
      configurationType {
        name
      }
    }
  }
`)
