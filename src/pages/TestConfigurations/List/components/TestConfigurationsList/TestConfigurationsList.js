import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useQuery } from 'react-apollo-hooks'

import { withStyles, IconButton } from '@material-ui/core'
import { Add, Pageview, History } from '@material-ui/icons'
import { ButtonWithIcon, SectionHeader, DataTable } from '~components'
import { Pagination } from '~containers'
import { useListFilters } from '~hooks'

import { GET_TEST_CONFIGURATIONS } from './graphql'
import styles from './TestConfigurationsList.styles'

export function TestConfigurationsList({ classes, onCreate, onDetails, projectId }) {
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
          render={configuration =>
            configuration.test_source &&
            configuration.test_source[configuration.test_source.source_type].name
          }
          title="Source"
        />
        <DataTable.Column
          key="lastRun"
          render={configuration => (
            <div className={classes.dateContainer}>
              {(configuration.executions[0] || {}).start && (
                <React.Fragment>
                  <IconButton className={classes.icon} disabled>
                    <History />
                  </IconButton>
                  <span>
                    {moment(configuration.executions[0].start).format('YYYY-MM-DD')}
                  </span>
                </React.Fragment>
              )}
            </div>
          )}
          title="Last Run"
        />
        <DataTable.Column
          key="actions"
          render={configuration => {
            return (
              <div className={classes.iconsContainer}>
                <IconButton
                  aria-label="Show configuration details"
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

export default withStyles(styles)(TestConfigurationsList)
