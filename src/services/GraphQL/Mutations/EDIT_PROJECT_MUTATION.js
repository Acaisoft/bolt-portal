import gql from 'graphql-tag'

export default gql`
  mutation($id: UUID!, $name: String!, $description: String) {
    testrun_project_update(id: $id, name: $name, description: $description) {
      returning {
        id
        name
        description
        image_url
      }
    }
  }
`
