import gql from 'graphql-tag'

export default gql(`
mutation ($name: String!, $description: String, $img: String) {
    project: insert_project(objects: [{name: $name, description: $description, image_url: $img}]) {
      returning {
        id
        name
        description
        image_url
      }
    }
  }
`)
