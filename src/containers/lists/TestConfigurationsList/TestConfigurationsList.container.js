import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { ButtonWithIcon, SectionHeader } from '~components'
import { Pagination } from '~containers'
import { withListFilters } from '~hocs'

import { GET_TEST_CONFIGURATIONS, RUN_TEST_SCENARIO } from './graphql'

import TestConfigurationsList from './TestConfigurationsList.component'

export class TestConfigurationsListContainer extends Component {
  static propTypes = {
    configsQuery: PropTypes.shape({
      configuration: PropTypes.array,
      configuration_aggregate: PropTypes.shape({
        aggregate: PropTypes.shape({
          count: PropTypes.number,
        }),
      }),
      loading: PropTypes.bool,
    }).isRequired,
    listFilters: PropTypes.shape({
      setPagination: PropTypes.func.isRequired,
    }).isRequired,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    projectId: PropTypes.string,
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
    const {
      configsQuery: { configurations = [], configuration_aggregate, loading },
      listFilters,
      projectId,
      onCreate,
      onDelete,
      onDetails,
      onEdit,
    } = this.props
    const { runningConfigurationId } = this.state

    const totalCount = configuration_aggregate
      ? configuration_aggregate.aggregate.count
      : 0

    return (
      <React.Fragment>
        <SectionHeader title="Scenarios" subtitle={`(${totalCount})`} marginBottom>
          <Pagination totalCount={totalCount} onChange={listFilters.setPagination} />
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
  }
}

export default compose(
  withListFilters({ initialState: props => ({ rowsPerPage: 10 }) }),
  graphql(RUN_TEST_SCENARIO, { name: 'runTestScenarioMutation' }),
  graphql(GET_TEST_CONFIGURATIONS, {
    name: 'configsQuery',
    options: ({ projectId, listFilters }) => ({
      variables: {
        projectId,
        limit: listFilters.rowsPerPage,
        offset: listFilters.offset,
        order_by: [{ id: 'asc' }],
      },
      fetchPolicy: 'cache-and-network',
    }),
  })
)(TestConfigurationsListContainer)
