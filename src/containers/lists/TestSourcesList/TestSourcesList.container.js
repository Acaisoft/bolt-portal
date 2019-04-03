import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Add } from '@material-ui/icons'
import { Pagination, RemoteList } from '~containers'
import { ButtonWithIcon, SectionHeader } from '~components'

import { GET_TEST_SOURCES_QUERY } from '~services/GraphQL/Queries'

import TestSourcesList from './TestSourcesList.component'

export class TestSourcesListContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const { projectId, onCreate, onDelete, onEdit } = this.props

    const query = GET_TEST_SOURCES_QUERY

    const variables = {
      projectId,
      order_by: [{ id: 'asc' }],
    }

    return (
      <RemoteList
        paginationDataKey="test_source_aggregate"
        query={query}
        variables={variables}
      >
        {({ data, loading, pagination }) => {
          const testSources = (data && data.test_source) || []

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
        }}
      </RemoteList>
    )
  }
}

export default TestSourcesListContainer
