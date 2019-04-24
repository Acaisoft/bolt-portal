import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, withStyles } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import { Pagination } from '~containers'
import { DataTable, SectionHeader } from '~components'
import { useListFilters, useLocalFilteredList } from '~hooks'

import styles from './ResponsesTable.styles'

export function ResponsesTable({ classes, data, onDetails }) {
  const listFilters = useListFilters({ rowsPerPage: 5 })
  const paginatedData = useLocalFilteredList(data, listFilters)
  const totalCount = data.length

  return (
    <React.Fragment>
      <SectionHeader title="Responses" className={classes.header}>
        <Pagination
          {...listFilters}
          totalCount={totalCount}
          onChange={listFilters.setPagination}
        />
      </SectionHeader>

      <div className={classes.tableContainer}>
        <DataTable
          data={paginatedData}
          isLoading={false}
          rowKey={response => `${response.Method} ${response.Name}`}
        >
          <DataTable.Column
            key="type"
            render={response => response.Method}
            title="Type"
          />
          <DataTable.Column
            key="name"
            render={response => response.Name}
            title="Name"
          />
          <DataTable.Column
            key="total"
            render={response => response['# requests']}
            title="Total"
          />
          <DataTable.Column
            key="success"
            render={response => response['# successes']}
            title="Success"
          />
          <DataTable.Column
            key="fail"
            render={response => response['# failures']}
            title="Fail"
          />
          <DataTable.Column
            key="avg_response_time"
            render={response => response['Average response time']}
            title="Avg. Response Time"
          />
          <DataTable.Column
            key="avg_response_size"
            render={response => response['Average Content Size']}
            title="Avg. Response Size"
          />
          <DataTable.Column
            key="requests_per_sec"
            render={response => response['Requests/s']}
            title="Req/s"
          />
          <DataTable.Column
            key="actions"
            render={response => (
              <div className={classes.iconsContainer}>
                {+response['# failures'] > 0 && (
                  <IconButton
                    aria-label="Show fails"
                    className={classes.icon}
                    onClick={() => onDetails(response)}
                  >
                    <Pageview />
                  </IconButton>
                )}
              </div>
            )}
            title="Fails"
          />
        </DataTable>
      </div>
    </React.Fragment>
  )
}

ResponsesTable.propTypes = {
  data: PropTypes.array.isRequired,
  onDetails: PropTypes.func.isRequired,
}

export default withStyles(styles)(ResponsesTable)
