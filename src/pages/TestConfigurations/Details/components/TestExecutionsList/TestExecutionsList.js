import React from 'react'
import moment from 'moment'
import { useQuery, useSubscription } from 'react-apollo-hooks'

import { withStyles } from '@material-ui/core'
import { DataTable, SectionHeader, LinkButton, NoWrap } from '~components'
import { Pagination } from '~containers'
import { useListFilters } from '~hooks'

import { formatThousands, formatPercent } from '~utils/numbers'

import {
  GET_TEST_EXECUTIONS_AGGREGATE,
  SUBSCRIBE_TO_CONFIGURATION_EXECUTIONS,
} from './graphql'
import styles from './TestExecutionsList.styles'

function TestExecutionsList({ classes, configurationId, onDetails }) {
  const { pagination, orderBy, setPagination } = useListFilters({
    pagination: { rowsPerPage: 5 },
    orderBy: [{ start: 'desc' }],
  })

  const { data: { executionsAggregate } = {} } = useQuery(
    GET_TEST_EXECUTIONS_AGGREGATE,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        configurationId,
        limit: pagination.rowsPerPage,
        offset: pagination.offset,
        order_by: orderBy,
      },
    }
  )

  const { data: { executions = [] } = {}, loading } = useSubscription(
    SUBSCRIBE_TO_CONFIGURATION_EXECUTIONS,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        configurationId,
        limit: pagination.rowsPerPage,
        offset: pagination.offset,
        order_by: orderBy,
      },
    }
  )

  const totalCount =
    (executionsAggregate && executionsAggregate.aggregate.count) || 0

  return (
    <div>
      <SectionHeader title="Last Test Runs" marginBottom>
        {!loading && (
          <Pagination
            {...pagination}
            totalCount={totalCount}
            onChange={setPagination}
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
          render={execution => (
            <NoWrap>{moment(execution.start).format('YYYY-MM-DD HH:mm')}</NoWrap>
          )}
          title="Run Date"
        />
        <DataTable.Column
          key="status"
          render={execution => execution.status}
          title="Status"
        />
        <DataTable.Column
          key="response_times"
          render={({ executionTotals }) => {
            const min = executionTotals.aggregate.min.min_response_time || 0
            const avg = executionTotals.aggregate.avg.average_response_time || 0
            const max = executionTotals.aggregate.max.max_response_time || 0

            return (
              <NoWrap>
                {formatThousands(min)} / {formatThousands(avg)} /{' '}
                {formatThousands(max)}
              </NoWrap>
            )
          }}
          title={
            <NoWrap>
              Response Times [ms]
              <br />
              Min / Avg / Max
            </NoWrap>
          }
        />
        <DataTable.Column
          key="passed"
          render={({ executionTotals }) => {
            const successes =
              (executionTotals.aggregate.sum.num_requests || 0) -
              (executionTotals.aggregate.sum.num_failures || 0)
            const total = executionTotals.aggregate.sum.num_requests || 0
            const percent = total > 0 ? successes / total : 0

            return (
              <NoWrap className={classes.success}>
                {formatPercent(percent)} ({formatThousands(successes)})
              </NoWrap>
            )
          }}
          title="Passed"
        />
        <DataTable.Column
          key="fails"
          render={({ executionTotals }) => {
            const failures = executionTotals.aggregate.sum.num_failures || 0
            const total = executionTotals.aggregate.sum.num_requests || 0
            const percent = total > 0 ? failures / total : 0

            return (
              <NoWrap className={classes.failure}>
                {formatPercent(percent)} ({formatThousands(failures)})
              </NoWrap>
            )
          }}
          title="Fails"
        />
        <DataTable.Column
          key="total"
          render={({ executionTotals }) => (
            <NoWrap>
              {formatThousands(executionTotals.aggregate.sum.num_requests || 0)}
            </NoWrap>
          )}
          title="Total"
        />
        <DataTable.Column
          key="actions"
          render={execution => (
            <LinkButton
              aria-label="Show details"
              onClick={() => onDetails(execution)}
            >
              Details
            </LinkButton>
          )}
        />
      </DataTable>
    </div>
  )
}

export default withStyles(styles)(TestExecutionsList)
