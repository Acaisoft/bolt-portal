import { gql } from '@apollo/client'

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String, $image_url: String) {
    testrun_project_create(
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

export const EDIT_PROJECT = gql`
  mutation editProject(
    $id: UUID!
    $name: String!
    $description: String
    $image_url: String
  ) {
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
