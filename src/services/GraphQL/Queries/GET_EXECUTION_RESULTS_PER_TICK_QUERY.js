import gql from 'graphql-tag'
import { EXECUTION_TIME_PARAMETER_FRAGMENT } from '../Fragments'

export default gql`
  query getExecutionResultsPerTick($executionId: uuid!) {
    execution_by_pk(id: $executionId) {
      id
      start
      end
      ...executionTimeParameter
    }

    result_aggregate(where: { execution_id: { _eq: $executionId } }) {
      id
      number_of_fails
      number_of_successes
      average_response_time
      timestamp
    }
  }

  ${EXECUTION_TIME_PARAMETER_FRAGMENT}
`
