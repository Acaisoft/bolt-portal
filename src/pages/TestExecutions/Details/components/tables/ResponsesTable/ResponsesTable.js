import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

import { IconButton, withStyles } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import { DataTable, SectionHeader } from '~components'

import { formatThousands, formatPercent } from '~utils/numbers'

import styles from './ResponsesTable.styles'

export function ResponsesTable({ classes, data, onDetails }) {
  const summary = useMemo(
    () => ({
      requests: _.sum(data.map(x => +x.num_requests)),
      successes: _.sum(data.map(x => +x.num_successes)),
      failures: _.sum(data.map(x => +x.num_failures)),
      requestsPerSecond: _.sum(data.map(x => +x.requests_per_second)),
      minResponseTime: _.min(data.map(x => +x.min_response_time)),
      averageResponseTime: _.mean(data.map(x => +x.average_response_time)),
      maxResponseTime: _.max(data.map(x => +x.max_response_time)),
    }),
    [data]
  )

  return (
    <React.Fragment>
      <SectionHeader title="Responses" className={classes.header} />

      <div className={classes.tableContainer}>
        <DataTable
          data={data}
          isLoading={false}
          rowKey={response => response.identifier}
          hasFooter
        >
          <DataTable.Column
            key="type"
            render={response => response.method}
            title="Type"
          />
          <DataTable.Column
            key="name"
            render={response => response.name}
            title="Name"
          />
          <DataTable.Column
            key="total"
            render={response => formatThousands(response.num_requests || 0)}
            renderFooter={() => formatThousands(summary.requests)}
            title="Total"
          />
          <DataTable.Column
            key="success"
            render={({ num_requests = 0, num_successes = 0 }) => (
              <div className={classNames(classes.noWrap, classes.success)}>
                <span>{formatPercent(num_successes / num_requests)}</span>{' '}
                <span>({formatThousands(num_successes)})</span>
              </div>
            )}
            renderFooter={() => (
              <div className={classes.success}>
                {formatThousands(summary.successes)}
              </div>
            )}
            title="Success"
          />
          <DataTable.Column
            key="fail"
            render={({ num_failures, num_requests }) => (
              <div className={classNames(classes.noWrap, classes.failure)}>
                <span>{formatPercent(num_failures / num_requests)}</span>{' '}
                <span>({formatThousands(num_failures)})</span>
              </div>
            )}
            renderFooter={() => (
              <div className={classes.failure}>
                {formatThousands(summary.failures)}
              </div>
            )}
            title="Fail"
          />
          <DataTable.Column
            key="response_time"
            render={response => (
              <div className={classes.noWrap}>
                {formatThousands(response.min_response_time)} /{' '}
                {formatThousands(response.average_response_time)} /{' '}
                {formatThousands(response.max_response_time)}
              </div>
            )}
            renderFooter={() => (
              <div className={classes.noWrap}>
                {formatThousands(summary.minResponseTime)} /{' '}
                {formatThousands(summary.averageResponseTime)} /{' '}
                {formatThousands(summary.maxResponseTime)}
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
            key="requests_per_second"
            render={response => formatThousands(response.requests_per_second)}
            renderFooter={() => formatThousands(summary.requestsPerSecond)}
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
