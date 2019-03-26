import gql from 'graphql-tag'
export default gql`
  query getProjects {
    project {
      id
      name
      description
      image_url
    }
  }
`
