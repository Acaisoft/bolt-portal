import gql from 'graphql-tag'

export const GET_REPOSITORY_KEY = gql`
  query getRepositoryKey {
    repositoryKey: testrun_repository_key
  }
`
