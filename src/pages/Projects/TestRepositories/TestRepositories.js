import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import DataTable from '~components/DataTable'
import styles from './TestRepositories.styles'
import AddButton from '~components/AddButton'
import RepositoryForm from './components/RepositoryForm'

import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'

export class TestRepositories extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    open: false,
    type: null,
    updateFormValues: {
      name: null,
      url: null,
      id: null,
    },
  }

  toggleDrawer = (type, status) => {
    this.setState({
      open: status,
      type: type,
      updateFormValues: {
        name: '',
        url: '',
      },
    })
  }

  updateFormDrawer = (e, name, url, id) => {
    e.preventDefault()
    this.setState({
      open: true,
      type: 'update',
      updateFormValues: {
        name,
        url,
        id,
      },
    })
  }

  addTestConfigs = configs => {
    let text = ''
    configs.map((conf, i) => {
      if (configs.length === i + 1) {
        return (text += conf.configurationType.name)
      } else {
        return (text += `${conf.configurationType.name} | `)
      }
    })
    return text
  }

  render() {
    const { classes } = this.props
    const { open, updateFormValues, type } = this.state

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in project
        </Typography>
        <RepositoryForm
          open={open}
          type={type}
          courseInitData={updateFormValues}
          close={this.toggleDrawer}
        />
        <div className={classes.btnContainer}>
          <AddButton open={this.toggleDrawer} />
        </div>
        <Query query={GET_REPOSITORIES_QUERY} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            const repositories = data.repository

            return (
              <div className={classes.tableContainer}>
                <DataTable
                  data={repositories}
                  isLoading={loading}
                  rowKey={test => test.id}
                >
                  <DataTable.Column
                    key="name"
                    render={test => test.name}
                    title="Name"
                  />
                  <DataTable.Column
                    key="url"
                    render={test => test.url}
                    title="URL"
                  />
                  <DataTable.Column
                    key="username"
                    render={test => test.username}
                    title="Username"
                  />
                  <DataTable.Column
                    key="testRunConfigs"
                    render={test => this.addTestConfigs(test.configurations)}
                    title="Test Run Configurations"
                  />
                  <DataTable.Column
                    key="actions"
                    render={test => (
                      <div>
                        <IconButton
                          aria-label="Edit repository"
                          onClick={event =>
                            this.updateFormDrawer(
                              event,
                              test.name,
                              test.url,
                              test.id
                            )
                          }
                        >
                          <Edit />
                        </IconButton>
                      </div>
                    )}
                    title="Actions"
                  />
                </DataTable>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withStyles(styles)(TestRepositories)
