import gql from 'graphql-tag'

export const ADD_REPOSITORY_MUTATION = gql`
  mutation addRepository(
    $name: String!
    $project_id: UUID!
    $repository_url: String!
    $type_slug: String!
  ) {
    repository: testrun_repository_create(
      name: $name
      project_id: $project_id
      repository_url: $repository_url
      type_slug: $type_slug
    ) {
      returning {
        id
      }
    }
  }
`

export const EDIT_REPOSITORY_MUTATION = gql`
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

export const ADD_REPOSITORY_VALIDATE_MUTATION = gql`
  mutation addRepositoryValidate(
    $name: String!
    $project_id: UUID!
    $repository_url: String!
    $type_slug: String!
  ) {
    validation_result: testrun_repository_create_validate(
      name: $name
      project_id: $project_id
      repository_url: $repository_url
      type_slug: $type_slug
    ) {
      ok
    }
  }
`

export const EDIT_REPOSITORY_VALIDATE_MUTATION = gql`
  mutation editRepositoryValidate(
    $id: UUID!
    $name: String!
    $repository_url: String!
    $type_slug: String!
  ) {
    validation_result: testrun_repository_update_validate(
      id: $id
      name: $name
      repository_url: $repository_url
      type_slug: $type_slug
    ) {
      ok
    }
  }
`

export const GET_CONFIGURATION_TYPES_QUERY = gql`
  query getConfigurationTypesForSelector {
    configuration_type {
      id
      name
      slug_name
    }
  }
`
