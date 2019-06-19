import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { useQuery, useSubscription } from 'react-apollo-hooks'

import {
  Box,
  IconButton,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import {
  DataTable,
  SectionHeader,
  Button,
  NoWrap,
  LoadingPlaceholder,
  ErrorPlaceholder,
  TestRunStatus,
  PopoverMenu,
} from '~components'
import { Pagination } from '~containers'
import { useListFilters, useMutationWithState } from '~hooks'
import { formatThousands, formatPercent } from '~utils/numbers'
import { TestRunStatus as TestRunStatusEnum } from '~config/constants'

import {
  GET_TEST_EXECUTIONS_AGGREGATE,
  SUBSCRIBE_TO_CONFIGURATION_EXECUTIONS,
  TERMINATE_EXECUTION,
} from './graphql'
import useStyles from './TestExecutionsList.styles'
import { MoreVert } from '@material-ui/icons'
import { Terminate, Debug } from '~assets/icons'

function TestExecutionsList({
  configuration: { id: configurationId, has_monitoring, has_load_tests },
  getMonitoringDetailsUrl,
  getTestDetailsUrl,
  getDebugUrl,
  onTerminate,
  hasMonitoring,
}) {
  const classes = useStyles()
  const { pagination, orderBy, setPagination } = useListFilters({
    pagination: { rowsPerPage: 5 },
    orderBy: [{ start: 'desc' }],
  })

  const { data: { executionsAggregate } = {} } = useQuery(
    GET_TEST_EXECUTIONS_AGGREGATE,
    {
      fetchPolicy: 'cache-and-network',
      variables: { configurationId },
    }
  )

  const { data: { executions = [] } = {}, loading, error } = useSubscription(
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

  const handleExecutionTerminate = useExecutionTerminate({ onTerminate })

  if (loading || error) {
    return (
      <Box p={2}>
        {loading ? (
          <LoadingPlaceholder title="Loading latest test runs" />
        ) : (
          <ErrorPlaceholder error={error} />
        )}
      </Box>
    )
  }

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
          render={execution => <TestRunStatus status={execution.status} />}
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
          key="results"
          title="Results"
          width={150}
          render={execution => (
            <NoWrap>
              {has_load_tests && (
                <Button
                  href={getTestDetailsUrl(execution)}
                  title="Show test run details"
                  variant="link"
                >
                  Tests
                </Button>
              )}
              {has_monitoring && (
                <Button
                  href={getMonitoringDetailsUrl(execution)}
                  title="Show monitoring details"
                  variant="link"
                >
                  Monitoring
                </Button>
              )}
            </NoWrap>
          )}
        />
        <DataTable.Column
          key="actions"
          width={40}
          render={execution => (
            <PopoverMenu
              id={execution.id}
              closeOnClick
              trigger={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
            >
              {execution && execution.argo_name && (
                <MenuItem
                  component="a"
                  href={getDebugUrl(execution)}
                  title="View test run in Argo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ListItemIcon>
                    <Debug />
                  </ListItemIcon>
                  <ListItemText>Debug</ListItemText>
                </MenuItem>
              )}
              <MenuItem
                onClick={() => handleExecutionTerminate(execution)}
                title="Terminate the test run"
                disabled={execution.status === TestRunStatusEnum.FINISHED}
              >
                <ListItemIcon>
                  <Terminate />
                </ListItemIcon>
                <ListItemText>Terminate</ListItemText>
              </MenuItem>
            </PopoverMenu>
          )}
        />
      </DataTable>
    </div>
  )
}
TestExecutionsList.propTypes = {
  configuration: PropTypes.object.isRequired,
  getMonitoringDetailsUrl: PropTypes.func.isRequired,
  getTestDetailsUrl: PropTypes.func.isRequired,
  hasMonitoring: PropTypes.bool,
}

function useExecutionTerminate({ onTerminate }) {
  const { error, data, mutation: terminate } = useMutationWithState(
    TERMINATE_EXECUTION
  )

  const handleExecutionTerminate = useCallback(
    execution =>
      execution && terminate({ variables: { argoName: execution.argo_name } }),
    [terminate]
  )

  useEffect(() => {
    if (error || data) {
      onTerminate({
        error: error ? error : _.get(data, 'testrun_terminate.message'),
        ok: _.get(data, 'testrun_terminate.ok', false),
      })
    }
  }, [error, data, onTerminate])

  return handleExecutionTerminate
}

export default TestExecutionsList
