import gql from 'graphql-tag'
export default gql(`
{
  repository {
    id
    name
    username
    url
    configurations {
      id
      name
      configurationType {
        name
      }
    }
  }
}
`)
