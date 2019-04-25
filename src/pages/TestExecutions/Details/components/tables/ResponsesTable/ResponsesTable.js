import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

import { IconButton, withStyles } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import { DataTable, SectionHeader } from '~components'

import { formatThousands, formatNumber } from '~utils/numbers'

import styles from './ResponsesTable.styles'

export function ResponsesTable({ classes, data, onDetails }) {
  const summary = useMemo(
    () => ({
      requests: _.sum(data.map(x => +x['# requests'])),
      successes: _.sum(data.map(x => +x['# successes'])),
      failures: _.sum(data.map(x => +x['# failures'])),
      requestsPerSecond: _.sum(data.map(x => +x['Requests/s'])),
      minResponseTime: _.min(data.map(x => +x['Min response time'])),
      averageResponseTime: _.mean(data.map(x => +x['Average response time'])),
      maxResponseTime: _.max(data.map(x => +x['Max response time'])),
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
          rowKey={response => `${response.Method} ${response.Name}`}
          hasFooter
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
            renderFooter={() => formatThousands(summary.requests)}
            title="Total"
          />
          <DataTable.Column
            key="success"
            render={response => (
              <div className={classNames(classes.noWrap, classes.success)}>
                <span>
                  {formatNumber(
                    (response['# successes'] / response['# requests']) * 100.0,
                    2
                  )}
                  %
                </span>{' '}
                <span>({formatThousands(response['# successes'])})</span>
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
            render={response => (
              <div className={classNames(classes.noWrap, classes.failure)}>
                <span>
                  {formatNumber(
                    (response['# failures'] / response['# requests']) * 100.0,
                    2
                  )}
                  %
                </span>{' '}
                <span>({formatThousands(response['# failures'])})</span>
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
                {formatThousands(response['Min response time'])} /{' '}
                {formatThousands(response['Average response time'])} /{' '}
                {formatThousands(response['Max response time'])}
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
            key="requests_per_sec"
            render={response => formatThousands(response['Requests/s'])}
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
