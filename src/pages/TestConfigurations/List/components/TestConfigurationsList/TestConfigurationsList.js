import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useQuery } from 'react-apollo-hooks'

import { withStyles, IconButton } from '@material-ui/core'
import { Add, Pageview, History, PlayArrow } from '@material-ui/icons'
import { ButtonWithIcon, SectionHeader, DataTable } from '~components'
import { Pagination } from '~containers'
import { useListFilters } from '~hooks'

import { formatPercent, formatThousands } from '~utils/numbers'

import { GET_TEST_CONFIGURATIONS } from './graphql'
import { useConfigurationRun } from '../../../hooks'
import styles from './TestConfigurationsList.styles'

export function TestConfigurationsList({
  classes,
  onCreate = () => {},
  onDetails = () => {},
  onRun = () => {},
  projectId,
}) {
  const { pagination, orderBy, setPagination } = useListFilters({
    pagination: { rowsPerPage: 10 },
    orderBy: [{ id: 'asc' }],
  })

  const {
    data: { configurations = [], configurationsAggregate },
    loading,
  } = useQuery(GET_TEST_CONFIGURATIONS, {
    variables: {
      projectId,
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
      order_by: orderBy,
    },
    fetchPolicy: 'cache-and-network',
  })

  const {
    loading: isStartingRun,
    mutation: runConfiguration,
  } = useConfigurationRun()

  const handleRun = useCallback(async configuration => {
    const error = await runConfiguration({
      variables: { configurationId: configuration.id },
    })
    onRun({ configuration, error })
  }, runConfiguration)

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
            <div className={classes.dateContainer}>
              {(executions[0] || {}).start && (
                <React.Fragment>
                  <IconButton className={classes.icon} disabled>
                    <History />
                  </IconButton>
                  <span>{moment(executions[0].start).format('YYYY-MM-DD')}</span>
                </React.Fragment>
              )}
            </div>
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
              <span className={classes.noWrap}>
                {formatThousands(totals.min.min_response_time)} /{' '}
                {formatThousands(totals.avg.average_response_time)} /{' '}
                {formatThousands(totals.max.max_response_time)}
              </span>
            )
          }}
          title={
            <div className={classes.noWrap}>
              Response Times [ms]
              <br />
              Min / Avg / Max
            </div>
          }
        />

        <DataTable.Column
          key="actions"
          render={configuration => {
            return (
              <div className={classes.iconsContainer}>
                <IconButton
                  aria-label="Run scenario"
                  className={classes.icon}
                  onClick={() => handleRun(configuration)}
                  disabled={isStartingRun || !configuration.test_source}
                >
                  <PlayArrow />
                </IconButton>
                <IconButton
                  aria-label="Show scenario details"
                  className={classes.icon}
                  onClick={() => onDetails(configuration)}
                >
                  <Pageview />
                </IconButton>
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

export default withStyles(styles)(TestConfigurationsList)
