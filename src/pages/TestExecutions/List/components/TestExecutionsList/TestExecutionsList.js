import React from 'react'
import moment from 'moment'
import { useQuery } from 'react-apollo-hooks'

import { IconButton } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import { DataTable, SectionHeader } from '~components'
import { useListFilters } from '~hooks'

import { GET_TEST_EXECUTIONS } from './graphql'
import { Pagination } from '~containers'

function TestExecutionsList({ configurationId, projectId, onDetails }) {
  const { pagination, orderBy, setPagination } = useListFilters({
    pagination: { rowsPerPage: 5 },
    orderBy: [{ start: 'desc' }],
  })

  const {
    data: { executions, executionsAggregate },
    loading,
  } = useQuery(GET_TEST_EXECUTIONS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      projectId,
      configurationId,
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
      order_by: orderBy,
    },
  })

  const totalCount =
    (executionsAggregate && executionsAggregate.aggregate.count) || 0

  return (
    <div>
      <SectionHeader title="Test Runs" subtitle={`(${totalCount})`} marginBottom>
        {!loading && (
          <Pagination
            {...pagination}
            onChange={setPagination}
            totalCount={totalCount}
          />
        )}
      </SectionHeader>

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
        {!projectId && (
          <DataTable.Column
            key="project"
            render={execution => execution.configuration.project.name}
            title="Project"
          />
        )}
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
