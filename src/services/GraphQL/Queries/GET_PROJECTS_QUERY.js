import gql from 'graphql-tag'
export default gql`
  query getProjectsQuery {
    project {
      id
      name
      description
    }
  }
`
