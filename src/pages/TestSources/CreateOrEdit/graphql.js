import { gql } from '@apollo/client'

export const GET_REPOSITORY_KEY = gql`
  query getRepositoryKey {
    repositoryKey: testrun_repository_key
  }
`
