import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'

import { Add } from '@material-ui/icons'
import { Pagination } from 'containers'
import {
  Button,
  DataTable,
  SectionHeader,
  LoadingPlaceholder,
  ErrorPlaceholder,
  NoDataPlaceholder,
} from 'components'

import { useListFilters } from 'hooks'
import { TestSourceType } from 'config/constants'

import { GET_TEST_SOURCES } from './graphql'
import useStyles from './TestSourcesList.styles'
import { Box } from '@material-ui/core'

function TestSourcesList({
  getCreateTestSourceUrl,
  getEditTestSourceUrl,
  projectId,
}) {
  const classes = useStyles()
  const { pagination, orderBy, setPagination } = useListFilters({
    pagination: { rowsPerPage: 10 },
    orderBy: [{ id: 'asc' }],
  })

  const {
    data: { testSources = [], testSourcesAggregate } = {},
    loading,
    error,
  } = useQuery(GET_TEST_SOURCES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      projectId,
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
      order_by: orderBy,
    },
  })

  if (loading || error || testSources.length === 0) {
    return (
      <Box p={3}>
        {loading ? (
          <LoadingPlaceholder title="Loading test sources..." />
        ) : error ? (
          <ErrorPlaceholder error={error} />
        ) : (
          <NoDataPlaceholder
            title="No test sources"
            description="Seems like you haven't created any test sources in this project yet."
            buttonUrl={getCreateTestSourceUrl()}
            buttonLabel="Create a test source"
          />
        )}
      </Box>
    )
  }

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
        <Button
          icon={Add}
          color="secondary"
          variant="contained"
          href={getCreateTestSourceUrl()}
        >
          New
        </Button>
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
        <DataTable.Column
          key="actions"
          render={source => (
            <div className={classes.iconsContainer}>
              <Button
                title="Edit source"
                href={getEditTestSourceUrl(source)}
                variant="link"
              >
                Edit
              </Button>
            </div>
          )}
          title="Actions"
        />
      </DataTable>
    </React.Fragment>
  )
}

TestSourcesList.propTypes = {
  getCreateTestSourceUrl: PropTypes.func.isRequired,
  getEditTestSourceUrl: PropTypes.func.isRequired,
  projectId: PropTypes.string,
}

export default TestSourcesList
