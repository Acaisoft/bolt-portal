import gql from 'graphql-tag'
export default gql`
  query getIsAuthorized {
    isAuthorized @client
  }
`
