import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { ButtonWithIcon, SectionHeader } from '~components'
import { Pagination } from '~containers'
import { withQueryPagination } from '~hocs'

import { GET_TEST_CONFIGURATIONS, RUN_TEST_SCENARIO } from './graphql'

import TestConfigurationsList from './TestConfigurationsList.component'

export class TestConfigurationsListContainer extends Component {
  static propTypes = {
    configsQuery: PropTypes.shape({
      configuration: PropTypes.array,
      loading: PropTypes.bool,
    }).isRequired,
    projectId: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
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
      configsQuery: { configurations = [], loading },
      projectId,
      onCreate,
      onDelete,
      onDetails,
      onEdit,
      pagination,
    } = this.props
    const { runningConfigurationId } = this.state

    return (
      <React.Fragment>
        <SectionHeader
          title="Scenarios"
          subtitle={`(${pagination.totalCount})`}
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
  }
}

export default compose(
  graphql(RUN_TEST_SCENARIO, { name: 'runTestScenarioMutation' }),
  graphql(GET_TEST_CONFIGURATIONS, {
    name: 'configsQuery',
    options: ({ projectId }) => ({
      variables: {
        projectId,
        order_by: [{ id: 'asc' }],
      },
    }),
  }),
  withQueryPagination({ queryProp: 'configsQuery' })
)(TestConfigurationsListContainer)
