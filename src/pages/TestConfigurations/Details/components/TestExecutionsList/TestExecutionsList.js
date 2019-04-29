import React from 'react'
import moment from 'moment'
import { useQuery } from 'react-apollo-hooks'

import { IconButton } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import { DataTable, SectionHeader } from '~components'
import { useListFilters } from '~hooks'

import { GET_TEST_EXECUTIONS } from './graphql'

function TestExecutionsList({ configurationId, onDetails }) {
  const { pagination, orderBy } = useListFilters({
    pagination: { rowsPerPage: 5 },
    orderBy: [{ start: 'desc' }],
  })

  const {
    data: { executions },
    loading,
  } = useQuery(GET_TEST_EXECUTIONS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      configurationId,
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
      order_by: orderBy,
    },
  })

  return (
    <div>
      <SectionHeader title="Last Test Runs" marginBottom />

      <DataTable
        data={executions}
        isLoading={loading}
        rowKey={execution => execution.id}
      >
        <DataTable.Column
          key="runDate"
          render={execution => moment(execution.start).format('YYYY-MM-DD HH:mm')}
          title="Run Date"
        />
        <DataTable.Column
          key="scenario"
          render={execution => execution.configuration.name}
          title="Scenario"
        />
        <DataTable.Column
          key="type"
          render={execution => execution.configuration.configuration_type.name}
          title="Type"
        />
        <DataTable.Column
          key="status"
          render={execution => execution.status}
          title="Status"
        />
        <DataTable.Column
          key="total"
          render={execution =>
            (execution.result_aggregate_aggregate.aggregate.sum.number_of_fails ||
              0) +
            (execution.result_aggregate_aggregate.aggregate.sum
              .number_of_successes || 0)
          }
          title="Total"
        />
        <DataTable.Column
          key="passed"
          render={execution =>
            execution.result_aggregate_aggregate.aggregate.sum.number_of_successes ||
            0
          }
          title="Passed"
        />
        <DataTable.Column
          key="fails"
          render={execution =>
            execution.result_aggregate_aggregate.aggregate.sum.number_of_fails || 0
          }
          title="Fails"
        />
        <DataTable.Column
          key="actions"
          render={execution => (
            <div>
              <IconButton
                aria-label="Show details"
                onClick={() => onDetails(execution)}
              >
                <Pageview />
              </IconButton>
            </div>
          )}
          title="Actions"
        />
      </DataTable>
    </div>
  )
}

export default TestExecutionsList
