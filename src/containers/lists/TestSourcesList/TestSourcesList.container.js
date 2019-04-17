import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose, graphql } from 'react-apollo'
import { Add } from '@material-ui/icons'
import { Pagination } from '~containers'
import { ButtonWithIcon, SectionHeader } from '~components'
import { withQueryPagination } from '~hocs'

import TestSourcesList from './TestSourcesList.component'
import { GET_TEST_SOURCES } from './graphql'

export class TestSourcesListContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const {
      projectId,
      onCreate,
      onDelete,
      onEdit,
      pagination,
      sourcesQuery: { testSources = [], loading },
    } = this.props

    return (
      <React.Fragment>
        <SectionHeader
          title="Test Sources"
          subtitle={`(${testSources.length})`}
          marginBottom
        >
          <Pagination {...pagination} />
          <ButtonWithIcon
            icon={Add}
            color="secondary"
            variant="contained"
            onClick={onCreate}
          >
            New
          </ButtonWithIcon>
        </SectionHeader>
        <TestSourcesList
          loading={loading}
          testSources={testSources}
          projectId={projectId}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(GET_TEST_SOURCES, {
    name: 'sourcesQuery',
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        projectId: props.projectId,
        order_by: [{ id: 'asc' }],
      },
    }),
  }),
  withQueryPagination({ queryProp: 'sourcesQuery' })
)(TestSourcesListContainer)
