import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'

import { Add, Edit, Delete } from '@material-ui/icons'
import { IconButton, withStyles } from '@material-ui/core'
import { Pagination } from '~containers'
import { ButtonWithIcon, DataTable, SectionHeader } from '~components'

import { useListFilters } from '~hooks'
import { TestSourceType } from '~config/constants'

import { GET_TEST_SOURCES } from './graphql'
import styles from './TestSourcesList.styles'

function TestSourcesList({ classes, onCreate, onDelete, onEdit, projectId }) {
  const { pagination, orderBy, setPagination } = useListFilters({
    pagination: { rowsPerPage: 10 },
    orderBy: [{ id: 'asc' }],
  })

  const {
    data: { testSources = [], testSourcesAggregate },
    loading,
  } = useQuery(GET_TEST_SOURCES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      projectId,
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
      order_by: orderBy,
    },
  })

  const totalCount =
    (testSourcesAggregate && testSourcesAggregate.aggregate.count) || 0

  return (
    <React.Fragment>
      <SectionHeader title="Test Sources" subtitle={`(${totalCount})`} marginBottom>
        {!loading && (
          <Pagination
            {...pagination}
            onChange={setPagination}
            totalCount={totalCount}
          />
        )}
        <ButtonWithIcon
          icon={Add}
          color="secondary"
          variant="contained"
          onClick={onCreate}
        >
          New
        </ButtonWithIcon>
      </SectionHeader>

      <DataTable data={testSources} isLoading={loading} rowKey={source => source.id}>
        <DataTable.Column
          key="name"
          render={source => (source[source.source_type] || {}).name}
          title="Name"
        />
        <DataTable.Column
          key="source_type"
          render={source => source.source_type}
          title="Source"
        />
        <DataTable.Column
          key="scenarios"
          render={source => source.configurations.map(c => c.name).join(', ')}
          title="Scenarios"
        />
        <DataTable.Column
          key="url"
          render={source =>
            source.source_type === TestSourceType.REPOSITORY
              ? source.repository.url
              : null
          }
          title="URL"
        />
        {/* <DataTable.Column
          key="actions"
          render={source => (
            <div className={classes.iconsContainer}>
              <IconButton
                aria-label="Edit source"
                className={classes.icon}
                onClick={() => onEdit(source)}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Delete source"
                className={classes.icon}
                onClick={() => onDelete(source)}
              >
                <Delete />
              </IconButton>
            </div>
          )}
          title="Actions"
        /> */}
      </DataTable>
    </React.Fragment>
  )
}

TestSourcesList.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  projectId: PropTypes.string,
}

export default withStyles(styles)(TestSourcesList)
