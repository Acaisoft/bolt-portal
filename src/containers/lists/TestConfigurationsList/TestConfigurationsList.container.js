import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { Pagination, RemoteList } from '~containers'
import { ButtonWithIcon, SectionHeader } from '~components'

import { GET_CONFIGS_QUERY } from '~services/GraphQL/Queries'
import { RUN_TEST_SCENARIO } from './graphql'

import TestConfigurationsList from './TestConfigurationsList.component'

export class TestConfigurationsListContainer extends Component {
  static propTypes = {
    projectId: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  state = {
    runningConfigurationId: null,
  }

  handleRun = async configuration => {
    this.setState({ runningConfigurationId: configuration.id })
    const res = await this.props.runTestScenarioMutation({
      variables: { configurationId: configuration.id },
    })

    if (res.errors) {
      toast.error(`Could not start: ${res.errors[0].message}`)
    } else {
      toast.success(`Scenario '${configuration.name}' has been started.`)
    }

    this.setState({ runningConfigurationId: null })
  }

  render() {
    const { projectId, onCreate, onDelete, onDetails, onEdit } = this.props
    const { runningConfigurationId } = this.state

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
              <SectionHeader
                title="Scenarios"
                subtitle={`(${configurations.length})`}
                marginBottom
              >
                <Pagination {...pagination} />
                <ButtonWithIcon
                  icon={Add}
                  variant="contained"
                  color="secondary"
                  onClick={onCreate}
                >
                  New
                </ButtonWithIcon>
              </SectionHeader>
              <TestConfigurationsList
                configurations={configurations}
                loading={loading}
                onRun={this.handleRun}
                onDelete={onDelete}
                onDetails={onDetails}
                onEdit={onEdit}
                runningConfigurationId={runningConfigurationId}
                projectId={projectId}
              />
            </React.Fragment>
          )
        }}
      </RemoteList>
    )
  }
}

export default graphql(RUN_TEST_SCENARIO, { name: 'runTestScenarioMutation' })(
  TestConfigurationsListContainer
)
