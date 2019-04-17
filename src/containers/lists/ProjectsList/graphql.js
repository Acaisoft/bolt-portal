import gql from 'graphql-tag'

export const GET_PROJECTS = gql`
  query getProjects {
    projects: project {
      id
      name
      description
      image_url
    }
  }
`
