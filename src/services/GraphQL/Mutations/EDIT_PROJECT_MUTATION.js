import gql from 'graphql-tag'

export default gql`
  mutation($id: UUID!, $name: String!, $description: String, $image_url: String) {
    testrun_project_update(
      id: $id
      name: $name
      description: $description
      image_url: $image_url
    ) {
      returning {
        id
        name
        description
        image_url
      }
    }
  }
`
