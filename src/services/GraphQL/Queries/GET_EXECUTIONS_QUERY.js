import gql from 'graphql-tag'
import { EXECUTION_FOR_LIST_FRAGMENT } from '../Fragments'

export default gql`
  query getExecutions($limit: Int, $offset: Int, $order_by: [execution_order_by!]) {
    execution(limit: $limit, offset: $offset, order_by: $order_by) {
      ...executionForList
    }
  }

  ${EXECUTION_FOR_LIST_FRAGMENT}
`
