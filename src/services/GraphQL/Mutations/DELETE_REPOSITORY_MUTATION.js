import gql from 'graphql-tag'

export default gql(`
mutation deleteRepository($id: uuid) {
    repository: delete_repository(where: {id: {_eq: $id}}) {
      returning {
        id
        name
      }
    }
  }
`)
