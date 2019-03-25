import gql from 'graphql-tag'

export default gql`
  mutation($name: String!, $description: String) {
    testrun_project_create(name: $name, description: $description) {
      returning {
        id
        name
        description
      }
    }
  }
`
