import gql from 'graphql-tag'
export default gql`
  query getRepositories($projectId: uuid) {
    repository(where: { project_id: { _eq: $projectId } }) {
      id
      name
      url
      configurations {
        id
        name
      }
      configurationType {
        id
        name
      }
    }
  }
`
