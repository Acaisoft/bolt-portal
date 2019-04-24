import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, withStyles } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import { DataTable, SectionHeader } from '~components'

import { formatThousands } from '~utils/numbers'

import styles from './ResponsesTable.styles'

export function ResponsesTable({ classes, data, onDetails }) {
  return (
    <React.Fragment>
      <SectionHeader title="Responses" className={classes.header} />

      <div className={classes.tableContainer}>
        <DataTable
          data={data}
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
            render={response => formatThousands(response['# requests'])}
            title="Total"
          />
          <DataTable.Column
            key="success"
            render={response => (
              <div className={classes.noWrap}>
                <span>
                  {(response['# successes'] / response['# requests']) * 100.0}%
                </span>{' '}
                <span>({formatThousands(response['# successes'])})</span>
              </div>
            )}
            title="Success"
          />
          <DataTable.Column
            key="fail"
            render={response => (
              <div className={classes.noWrap}>
                <span>
                  {(response['# failures'] / response['# requests']) * 100.0}%
                </span>{' '}
                <span>({formatThousands(response['# failures'])})</span>
              </div>
            )}
            title="Fail"
          />
          <DataTable.Column
            key="response_time"
            render={response => (
              <div className={classes.noWrap}>
                {formatThousands(response['Min response time'])} /{' '}
                {formatThousands(response['Average response time'])} /{' '}
                {formatThousands(response['Max response time'])}
              </div>
            )}
            title={
              <div>
                Response Time [ms]
                <br />
                <span className={classes.noWrap}>Min. / Avg. / Max.</span>
              </div>
            }
          />
          <DataTable.Column
            key="requests_per_sec"
            render={response => formatThousands(response['Requests/s'])}
            title="Req/s"
          />
          <DataTable.Column
            key="actions"
            render={response => (
              <div className={classes.iconsContainer}>
                <IconButton
                  aria-label="Show fails"
                  className={classes.icon}
                  onClick={() => onDetails(response)}
                >
                  <Pageview />
                </IconButton>
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
