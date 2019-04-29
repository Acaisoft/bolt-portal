import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { generatePath } from 'react-router-dom'
import { toast } from 'react-toastify'
import { withStyles, Grid } from '@material-ui/core'
import { TestConfiguration } from '~containers'
import { Loader, SubmitCancelModal } from '~components'

import {
  ConfigurationActions,
  ConfigurationInfo,
  TestExecutionsList,
} from './components'

import { getSubpageUrl } from '~utils/router'

import styles from './Details.styles'

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        configurationId: PropTypes.string.isRequired,
      }).isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    isStartingRun: false,
    isDeleteModalOpen: false,
  }

  handleDeleteModalOpen = () => {
    this.setState({ isDeleteModalOpen: true })
  }

  handleDeleteModalClose = () => {
    this.setState({ isDeleteModalOpen: false })
  }

  handleRun = async (configuration, runScenario) => {
    this.setState({ isStartingRun: true })
    const res = await runScenario()

    if (res.errors) {
      toast.error(`Could not start: ${res.errors[0].message}`)
    } else {
      toast.success(`Scenario '${configuration.name}' has been started.`)
    }
    this.setState({ isStartingRun: false })
  }

  handleExecutionDetails = execution => {
    const { history, match } = this.props

    history.push(
      generatePath('/projects/:projectId/test-runs/:executionId', {
        ...match.params,
        executionId: execution.id,
      })
    )
  }

  handleDeleteSubmit = async (configuration, deleteScenario) => {
    try {
      await deleteScenario()
    } catch (ex) {
      toast.error(ex.message)
    } finally {
      this.handleDeleteModalClose()
      this.goToList()
    }
  }

  goToEdit = () => {
    const { history, match } = this.props
    history.push(getSubpageUrl(match, '/edit'), { ...match.params })
  }

  goToList = () => {
    const { history, match } = this.props

    history.push(
      match.url
        .split('/')
        .slice(0, -1)
        .join('/')
    )
  }

  render() {
    const { classes, match } = this.props
    const { configurationId } = match.params
    const { isDeleteModalOpen, isStartingRun } = this.state

    return (
      <div className={classes.root}>
        <TestConfiguration configurationId={configurationId}>
          {({ data, loading, runScenario, deleteScenario }) => {
            if (loading) {
              return <Loader loading />
            }

            return (
              <React.Fragment>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6}>
                    {!data ? null : <ConfigurationInfo configuration={data} />}}
                  </Grid>
                  <Grid item container xs={12} sm={6} alignItems="stretch">
                    <ConfigurationActions
                      isPerformed={Boolean(data.performed)}
                      isRunning={isStartingRun}
                      onDelete={this.handleDeleteModalOpen}
                      onEdit={this.goToEdit}
                      onRun={() => this.handleRun(data, runScenario)}
                    />
                  </Grid>
                </Grid>
                <SubmitCancelModal
                  isOpen={isDeleteModalOpen}
                  onClose={this.handleDeleteModalClose}
                  onSubmit={() => this.handleDeleteSubmit(data, deleteScenario)}
                  submitLabel="Delete"
                >
                  Are you sure you want to delete test scenario <q>{data.name}</q>?
                </SubmitCancelModal>
              </React.Fragment>
            )
          }}
        </TestConfiguration>
        <div className={classes.tableContainer}>
          <TestExecutionsList
            configurationId={configurationId}
            onDetails={this.handleExecutionDetails}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details)
