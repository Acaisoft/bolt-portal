import gql from 'graphql-tag'
export default gql`
  query getProjectBySlug($projectSlug: String!) {
    project(where: { name: { _eq: $projectSlug } }) {
      id
      name
      description
    }
  }
`
