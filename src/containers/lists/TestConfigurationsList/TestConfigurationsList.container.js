import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import { Pagination, RemoteList } from '~containers'
import { SectionHeader } from '~components'

import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

import TestConfigurationsList from './TestConfigurationsList.component'

export class TestConfigurationsListContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    const { projectId, onDelete, onEdit } = this.props

    const query = GET_CONFIGS_QUERY

    const variables = {
      projectId,
      order_by: [{ id: 'asc' }],
    }

    return (
      <RemoteList
        paginationDataKey="configuration_aggregate"
        query={query}
        variables={variables}
      >
        {({ data, loading, pagination }) => {
          const configurations = (data && data.configuration) || []

          return (
            <React.Fragment>
              <Grid container justify="space-between" alignItems="center">
                <SectionHeader
                  title="Scenarios"
                  subtitle={`(${configurations.length})`}
                  description="Here you see results of all tests performed in the project"
                />

                <div>
                  <Pagination {...pagination} />
                </div>
              </Grid>
              <TestConfigurationsList
                configurations={configurations}
                loading={loading}
                onDelete={onDelete}
                onEdit={onEdit}
                projectId={projectId}
              />
            </React.Fragment>
          )
        }}
      </RemoteList>
    )
  }
}

export default TestConfigurationsListContainer
