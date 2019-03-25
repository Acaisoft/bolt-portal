import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TestExecutionResponsesTable } from '~components'
import { LocalList } from '~containers'

export class TestExecutionResponsesList extends Component {
  static propTypes = {
    responses: PropTypes.array.isRequired,
  }

  handleDetails = response => {}

  render() {
    const { responses } = this.props

    return (
      <LocalList data={responses} showPagination>
        {({ data }) => (
          <TestExecutionResponsesTable
            responses={data}
            onDetails={this.handleDetails}
          />
        )}
      </LocalList>
    )
  }
}

export default TestExecutionResponsesList
