import React from 'react'
import moment from 'moment'

import { IconButton } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'
import { TestRun } from '~assets/icons'

import { DataTable } from '~components'

export function TestExecutionsList({
  executions = [],
  loading,
  onDetails,
  projectId,
}) {
  return (
    <DataTable data={executions} isLoading={loading} rowKey={test => test.id}>
      <DataTable.Column key="icon" render={() => <TestRun />} title="" width={20} />
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
          (test.result_aggregate_aggregate.aggregate.sum.number_of_fails || 0) +
          (test.result_aggregate_aggregate.aggregate.sum.number_of_successes || 0)
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
              onClick={() => onDetails(execution)}
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

export default TestExecutionsList
