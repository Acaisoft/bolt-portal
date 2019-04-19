import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { generatePath } from 'react-router-dom'
import { withStyles, Grid } from '@material-ui/core'
import { TestExecutionsList } from '~containers/lists'
import { TestConfiguration } from '~containers'

import ConfigurationActions from './components/ConfigurationActions'
import ConfigurationInfo from './components/ConfigurationInfo'
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

  handleExecutionDetails = execution => {
    const { history, match } = this.props

    history.push(
      generatePath('/projects/:projectId/test-runs/:executionId', {
        ...match.params,
        executionId: execution.id,
      })
    )
  }

  goToEdit = () => {
    const { history, match } = this.props
    history.push(getSubpageUrl(match, '/edit'), { ...match.params })
  }

  render() {
    const { classes, match } = this.props
    const { configurationId } = match.params

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <TestConfiguration configurationId={configurationId}>
              {({ data }) =>
                !data ? null : <ConfigurationInfo configuration={data} />
              }
            </TestConfiguration>
          </Grid>
          <Grid item container xs={12} sm={6} alignItems="stretch">
            <ConfigurationActions onEdit={this.goToEdit} />
          </Grid>
        </Grid>
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
