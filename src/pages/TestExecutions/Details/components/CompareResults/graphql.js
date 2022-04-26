import { gql } from '@apollo/client'

const SCENARIO_ITEM = gql`
  fragment scenarioItem on configuration {
    id
    name
    executions(order_by: { start: desc }) {
      id
    }
  }
`

export const SUBSCRIBE_TO_SCENARIOS_LIST = gql`
  subscription subscribeToScenariosList(
    $projectId: uuid!
    $order_by: [configuration_order_by!]
  ) {
    configurations: configuration(
      where: { project_id: { _eq: $projectId }, is_deleted: { _eq: false } }
      order_by: $order_by
    ) {
      ...scenarioItem
    }
  }
  ${SCENARIO_ITEM}
`
export const SUBSCRIBE_TO_EXECUTIONS_LIST = gql`
  subscription subscribeToExecutionsList($configurationId: uuid!) {
    executions: execution(
      where: {
        configuration_id: { _eq: $configurationId }
        _or: [{ status: { _eq: "FINISHED" } }, { status: { _eq: "SUCCEEDED" } }]
      }
      order_by: { start: desc }
    ) {
      id
      start
    }
  }
`
