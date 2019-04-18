import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import { generatePath } from 'react-router-dom'
import { Query } from 'react-apollo'
import { MenuItem, Select, Divider, withStyles } from '@material-ui/core'
import { Computer } from '@material-ui/icons'
import { Loader } from '~components'

import styles from './ProjectSelector.styles'

const GET_PROJECTS = gql`
  query getProjectsForSelector {
    project(order_by: { name: asc }) {
      id
      name
    }
  }
`

class ProjectSelector extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  getProjectId = () => {
    const { location } = this.props
    const matches = location.pathname.match(/^\/projects\/([^/]+)/i)
    return matches && matches[1]
  }

  handleProjectChange = (e, projectId) => {
    const { history } = this.props

    const oldId = projectId || 'all'
    const newId = e.target.value

    if (newId === oldId) {
      return
    }

    history.push(
      generatePath('/projects/:projectId?', {
        projectId: newId === 'all' ? undefined : newId,
      })
    )
  }

  render() {
    const { classes } = this.props

    const projectId = this.getProjectId()
    console.log({ projectId })

    return (
      <Query query={GET_PROJECTS}>
        {({ data, loading, error }) => {
          if (error) return null

          const projects = data.project || []

          return (
            <Loader loading={loading} fill>
              <Select
                classes={{ select: classes.select, icon: classes.downIcon }}
                value={projectId || 'all'}
                onChange={e => this.handleProjectChange(e, projectId)}
                variant="filled"
                disableUnderline
              >
                {projects.map(project => (
                  <MenuItem
                    key={project.id}
                    value={project.id}
                    className={classes.item}
                  >
                    <Computer className={classes.itemIcon} /> {project.name}
                  </MenuItem>
                ))}
                <Divider className={classes.divider} />
                <MenuItem value="all" className={classes.item}>
                  <Computer className={classes.itemIcon} /> All Projects
                </MenuItem>
              </Select>
            </Loader>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(ProjectSelector)
