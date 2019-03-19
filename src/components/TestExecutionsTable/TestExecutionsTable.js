import React from 'react'
import moment from 'moment'

import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'

import { DataTable } from '~components'

export function TestExecutionsTable({
  executions,
  getDetailsUrl,
  loading,
  projectId,
}) {
  return (
    <DataTable data={executions} isLoading={loading} rowKey={test => test.id}>
      <DataTable.Column
        key="runDate"
        render={test => moment(test.start).format('YYYY-MM-DD HH:mm')}
        title="Run Date"
      />
      {!projectId && (
        <DataTable.Column
          key="project"
          render={test => test.configuration.project.name}
          title="Project"
        />
      )}
      <DataTable.Column
        key="scenario"
        render={test => test.configuration.name}
        title="Scenario"
      />
      <DataTable.Column
        key="type"
        render={test => test.configuration.configuration_type.name}
        title="Type"
      />
      <DataTable.Column key="status" render={test => test.status} title="Status" />
      <DataTable.Column
        key="total"
        render={test =>
          test.result_aggregate_aggregate.aggregate.sum.number_of_fails ||
          0 + test.result_aggregate_aggregate.aggregate.sum.number_of_successes ||
          0
        }
        title="Total"
      />
      <DataTable.Column
        key="passed"
        render={test =>
          test.result_aggregate_aggregate.aggregate.sum.number_of_successes || 0
        }
        title="Passed"
      />
      <DataTable.Column
        key="fails"
        render={test =>
          test.result_aggregate_aggregate.aggregate.sum.number_of_fails || 0
        }
        title="Fails"
      />
      <DataTable.Column
        key="actions"
        render={execution => (
          <div>
            <IconButton
              aria-label="Show details"
              component={Link}
              to={getDetailsUrl(execution)}
            >
              <Pageview />
            </IconButton>
          </div>
        )}
        title="Actions"
      />
    </DataTable>
  )
}

export default TestExecutionsTable
