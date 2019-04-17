import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Pagination } from '~containers'
import { withLocalPagination } from '~hocs'

import TestExecutionResponsesList from './TestExecutionResponsesList.component'

export class TestExecutionResponsesListContainer extends Component {
  static propTypes = {
    pagination: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
    paginatedData: PropTypes.array,
    responses: PropTypes.array.isRequired,
  }

  handleDetails = response => {}

  render() {
    const { pagination, paginatedData } = this.props

    return (
      <React.Fragment>
        <Pagination {...pagination} />
        <TestExecutionResponsesList
          responses={paginatedData}
          onDetails={this.handleDetails}
        />
      </React.Fragment>
    )
  }
}

export default withLocalPagination({
  dataProp: 'responses',
})(TestExecutionResponsesListContainer)
