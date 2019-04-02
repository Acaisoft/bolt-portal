import gql from 'graphql-tag'

export default gql`
  query getParameters {
    parameter {
      id
      name
      param_name
      param_type
      default_value
      slug_name
      type_slug
    }
  }
`
