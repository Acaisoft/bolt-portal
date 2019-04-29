import gql from 'graphql-tag'

export const GET_TEST_SOURCES = gql`
  query getTestSources(
    $projectId: uuid
    $limit: Int
    $offset: Int
    $order_by: [test_source_order_by!]
  ) {
    testSources: test_source(
      where: { project_id: { _eq: $projectId } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      id
      source_type
      configurations {
        id
        name
      }
      test_creator {
        id
        name
        created_by_id
        min_wait
        max_wait
        previous_version_id
      }
      repository {
        id
        name
        performed
        created_by_id
        url
      }
    }
    testSourcesAggregate: test_source_aggregate(
      where: { project_id: { _eq: $projectId } }
    ) {
      aggregate {
        count
      }
    }
  }
`
