import React from 'react'
import PropTypes from 'prop-types'
import { DataTable, SectionHeader, Button, NoWrap } from 'components'
import { formatThousands } from 'utils/numbers'
import useStyles from './CompareResponsesTable.styles'

export function CompareResponsesTable({
  classes: parentClasses,
  data,
  getEndpointDetailsUrl,
}) {
  const ownClasses = useStyles()
  const classes = { ...parentClasses, ownClasses }

  return (
    <React.Fragment>
      <SectionHeader
        title="Responses"
        size="small"
        className={classes.header}
        marginBottom
      />

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
            key="response_time"
            render={response => (
              <NoWrap>
                {formatThousands(response.min_response_time)} /{' '}
                {formatThousands(response.average_response_time)} /{' '}
                {formatThousands(response.max_response_time)}
              </NoWrap>
            )}
            title={
              <div>
                Response Time [ms]
                <br />
                <NoWrap>Min. / Avg. / Max.</NoWrap>
              </div>
            }
          />
          <DataTable.Column
            key="actions"
            render={response => (
              <Button
                title="Show fails"
                href={getEndpointDetailsUrl(response)}
                variant="link"
              >
                Details
              </Button>
            )}
          />
        </DataTable>
      </div>
    </React.Fragment>
  )
}

CompareResponsesTable.propTypes = {
  data: PropTypes.array.isRequired,
  getEndpointDetailsUrl: PropTypes.func.isRequired,
}

export default CompareResponsesTable
