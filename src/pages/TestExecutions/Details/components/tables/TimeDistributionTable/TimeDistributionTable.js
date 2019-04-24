import React from 'react'
import PropTypes from 'prop-types'

import { CircularProgress, withStyles } from '@material-ui/core'
import { Pagination } from '~containers'
import { SectionHeader, DataTable } from '~components'
import { useListFilters, useLocalFilteredList } from '~hooks'

import styles from './TimeDistributionTable.styles'

const percentiles = [50, 66, 75, 80, 90, 95, 100]

export function TimeDistributionTable({ classes, data, onDetails }) {
  const listFilters = useListFilters({ rowsPerPage: 5 })
  const paginatedData = useLocalFilteredList(data, listFilters)
  const totalCount = data.length

  return (
    <React.Fragment>
      <SectionHeader title="Time Distribution" className={classes.header}>
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
          {percentiles.map(percentile => (
            <DataTable.Column
              key={percentile}
              render={response => +response[`${percentile}%`]}
              title={
                <div className={classes.percentileHeader}>
                  <CircularProgress
                    className={classes.percentileProgress}
                    value={percentile}
                    variant="static"
                    size={16}
                    thickness={8}
                  />{' '}
                  {percentile}%
                </div>
              }
            />
          ))}
        </DataTable>
      </div>
    </React.Fragment>
  )
}

TimeDistributionTable.propTypes = {
  data: PropTypes.array.isRequired,
  onDetails: PropTypes.func.isRequired,
}

export default withStyles(styles)(TimeDistributionTable)
