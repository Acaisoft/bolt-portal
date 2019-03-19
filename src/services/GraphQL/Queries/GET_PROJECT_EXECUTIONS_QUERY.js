import gql from 'graphql-tag'
import { EXECUTION_FOR_LIST_FRAGMENT } from '../Fragments'

export default gql`
  query getProjectExecutions(
    $projectId: uuid!
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    execution(
      where: { configuration: { project_id: { _eq: $projectId } } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      ...executionForList
    }
    execution_aggregate(
      where: { configuration: { project_id: { _eq: $projectId } } }
    ) {
      aggregate {
        count
      }
    }
  }

  ${EXECUTION_FOR_LIST_FRAGMENT}
`
