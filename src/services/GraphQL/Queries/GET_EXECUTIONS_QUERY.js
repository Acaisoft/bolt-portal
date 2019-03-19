import gql from 'graphql-tag'
import { EXECUTION_FOR_LIST_FRAGMENT } from '../Fragments'

export default gql`
  query getExecutions(
    $configurationId: uuid!
    $limit: Int
    $offset: Int
    $order_by: [execution_order_by!]
  ) {
    execution(
      where: { configuration_id: { _eq: $projectId } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      ...executionForList
    }
  }

  ${EXECUTION_FOR_LIST_FRAGMENT}
`
