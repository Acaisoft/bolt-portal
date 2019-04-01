import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Pagination, RemoteList } from '~containers'
import { ButtonWithIcon, SectionHeader } from '~components'

import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'

import TestConfigurationsList from './TestConfigurationsList.component'

export class TestConfigurationsListContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const { projectId, onCreate, onDelete, onDetails, onEdit } = this.props

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
                />

                <Grid item>
                  <Grid container justify="flex-end" alignItems="center">
                    <Pagination {...pagination} />
                    <ButtonWithIcon
                      icon={Add}
                      variant="contained"
                      color="secondary"
                      onClick={onCreate}
                    >
                      New
                    </ButtonWithIcon>
                  </Grid>
                </Grid>
              </Grid>
              <TestConfigurationsList
                configurations={configurations}
                loading={loading}
                onDelete={onDelete}
                onDetails={onDetails}
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
