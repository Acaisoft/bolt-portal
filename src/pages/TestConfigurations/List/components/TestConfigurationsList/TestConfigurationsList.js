import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSubscription } from 'react-apollo-hooks'

import { IconButton } from '@material-ui/core'
import { Add, History } from '@material-ui/icons'
import {
  ButtonWithIcon,
  SectionHeader,
  DataTable,
  NoWrap,
  LinkButton,
} from '~components'
import { Pagination } from '~containers'
import { useListFilters } from '~hooks'

import { formatPercent, formatThousands } from '~utils/numbers'

import {
  SUBSCRIBE_TO_TEST_CONFIGURATION_LIST_ITEM,
  SUBSCRIBE_TO_TEST_CONFIGURATION_AGGREGATE_LIST_ITEM,
} from './graphql'
import useStyles from './TestConfigurationsList.styles'

export function TestConfigurationsList({
  onCreate = () => {},
  onDetails = () => {},
  onRun = () => {},
  projectId,
}) {
  const classes = useStyles()
  const { pagination, orderBy, setPagination } = useListFilters({
    pagination: { rowsPerPage: 10 },
    orderBy: [{ id: 'asc' }],
  })

  const {
    data: { configurations } = {},
    loading: loadingConfigurations,
  } = useSubscription(SUBSCRIBE_TO_TEST_CONFIGURATION_LIST_ITEM, {
    variables: {
      projectId,
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
      order_by: orderBy,
    },
    fetchPolicy: 'cache-and-network',
  })

  const {
    data: { configurationsAggregate } = {},
    loading: loadingConfigurationsAggregate,
  } = useSubscription(SUBSCRIBE_TO_TEST_CONFIGURATION_AGGREGATE_LIST_ITEM, {
    variables: {
      projectId,
    },
    fetchPolicy: 'cache-and-network',
  })

  const loading = loadingConfigurations || loadingConfigurationsAggregate

  const totalCount = configurationsAggregate
    ? configurationsAggregate.aggregate.count
    : 0

  return (
    <React.Fragment>
      <SectionHeader title="Scenarios" subtitle={`(${totalCount})`} marginBottom>
        {!loading && (
          <Pagination
            {...pagination}
            onChange={setPagination}
            totalCount={totalCount}
          />
        )}
        <ButtonWithIcon
          icon={Add}
          variant="contained"
          color="secondary"
          onClick={onCreate}
        >
          New
        </ButtonWithIcon>
      </SectionHeader>
      <DataTable
        data={configurations}
        isLoading={loading}
        rowKey={configuration => configuration.id}
      >
        <DataTable.Column
          key="name"
          render={configuration => configuration.name}
          title="Name"
        />
        <DataTable.Column
          key="type"
          render={configuration => configuration.configuration_type.name}
          title="Type"
        />
        <DataTable.Column
          key="source"
          render={({ test_source }) =>
            test_source && test_source[test_source.source_type].name
          }
          title="Source"
        />
        <DataTable.Column
          key="lastRun"
          render={({ executions }) => (
            <NoWrap className={classes.dateContainer}>
              {(executions[0] || {}).start && (
                <React.Fragment>
                  <IconButton className={classes.icon} disabled>
                    <History />
                  </IconButton>
                  <span>{moment(executions[0].start).format('YYYY-MM-DD')}</span>
                </React.Fragment>
              )}
            </NoWrap>
          )}
          title="Last Run"
        />
        <DataTable.Column
          key="success_rate"
          render={({ executions }) => {
            if (executions.length === 0) {
              return null
            }

            const totals = executions[0].execution_request_totals_aggregate.aggregate
            const successRate =
              (totals.sum.num_requests - totals.sum.num_failures) /
              totals.sum.num_requests
            const successRateClass = getSuccessRateLevel(successRate)

            return (
              <span className={classes[successRateClass]}>
                {formatPercent(successRate)}
              </span>
            )
          }}
          title="Success Rate"
        />

        <DataTable.Column
          key="last_execution_response_time"
          render={({ executions }) => {
            if (executions.length === 0) {
              return null
            }

            const totals = executions[0].execution_request_totals_aggregate.aggregate
            return (
              <NoWrap>
                {formatThousands(totals.min.min_response_time)} /{' '}
                {formatThousands(totals.avg.average_response_time)} /{' '}
                {formatThousands(totals.max.max_response_time)}
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
          key="actions"
          render={configuration => {
            return (
              <div className={classes.actionsContainer}>
                <LinkButton
                  onClick={() => onDetails(configuration)}
                  title="Show scenario details"
                >
                  Details
                </LinkButton>
              </div>
            )
          }}
          title="Actions"
        />
      </DataTable>
    </React.Fragment>
  )
}

TestConfigurationsList.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  projectId: PropTypes.string,
}

function getSuccessRateLevel(successRate) {
  return successRate >= 0.95 ? 'good' : successRate >= 0.8 ? 'average' : 'bad'
}

export default TestConfigurationsList
