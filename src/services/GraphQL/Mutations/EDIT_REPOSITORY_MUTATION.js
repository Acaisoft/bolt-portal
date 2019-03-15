import gql from 'graphql-tag'

export default gql`
  mutation($name: String!, $url: String, $id: uuid!) {
    repository: update_repository(
      _set: { name: $name, url: $url }
      where: { id: { _eq: $id } }
    ) {
      returning {
        id
        name
        url
      }
    }
  }
`
