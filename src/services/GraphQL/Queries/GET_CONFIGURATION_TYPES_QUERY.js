import gql from 'graphql-tag'

export default gql`
  query getConfigurationTypes {
    configuration_type {
      id
      name
      slug_name
    }
  }
`
