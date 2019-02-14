import gql from 'graphql-tag'
export default gql(`
query getRepositories($projectId: uuid) {
  repository(where: {project_id: {_eq: $projectId}}) {
    id
    name
    username
    url
    configurations {
      id
      name
      configurationType {
        name
      }
    }
  }
}
`)
