import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { LocalList } from '~containers'

import TestExecutionResponsesList from './TestExecutionResponsesList.component'

export class TestExecutionResponsesListContainer extends Component {
  static propTypes = {
    responses: PropTypes.array.isRequired,
  }

  handleDetails = response => {}

  render() {
    const { responses } = this.props

    return (
      <LocalList data={responses} showPagination>
        {({ data }) => (
          <TestExecutionResponsesList
            responses={data}
            onDetails={this.handleDetails}
          />
        )}
      </LocalList>
    )
  }
}

export default TestExecutionResponsesListContainer
