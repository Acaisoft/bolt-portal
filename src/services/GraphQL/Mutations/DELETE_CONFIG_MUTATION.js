import gql from 'graphql-tag'

export default gql(`
mutation deleteConfig($id: uuid) {
    config: delete_configuration(where: {id: {_eq: $id}}) {
      returning {
        id
        name
      }
    }
  }
`)
