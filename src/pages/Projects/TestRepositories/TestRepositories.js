import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { Link } from 'react-router-dom'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import DataTable from '~components/DataTable'
import styles from './TestRepositories.styles'
import AddButton from '~components/AddButton'

import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'

export class TestRepositories extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          Here you see results of all tests performed in project
        </Typography>
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
                    render={test => 'Test Static Text'}
                    title="Test Run Configurations"
                  />
                  <DataTable.Column
                    key="actions"
                    render={profile => (
                      <div>
                        <IconButton
                          aria-label="Edit repository"
                          component={Link}
                          disabled
                          to={`/profiles/details/${profile.id}`}
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
