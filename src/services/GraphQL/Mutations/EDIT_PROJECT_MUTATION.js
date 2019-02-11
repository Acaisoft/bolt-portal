import gql from 'graphql-tag'

export default gql(`
mutation ($name: String!, $description: String, $img: String, $id: uuid!) {
    project: update_project(_set:{name: $name, description: $description, image_url: $img}, where:{id: {_eq: $id}}) {
      returning {
        id
        name
        description
        image_url
      }
    }
  }  
`)
