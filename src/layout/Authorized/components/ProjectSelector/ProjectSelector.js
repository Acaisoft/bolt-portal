import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import { Query } from 'react-apollo'
import { Loading } from '~components'
import { MenuItem, Select, Divider, withStyles } from '@material-ui/core'

import styles from './ProjectSelector.styles'
import { Computer } from '@material-ui/icons'

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
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  handleProjectChange = e => {
    const { history, match } = this.props

    const oldId = match.params.projectId || 'all'
    const newId = e.target.value

    if (newId === oldId) {
      return
    }

    history.push(`/projects/${newId === 'all' ? '' : newId}`)
  }

  render() {
    const { classes, match } = this.props
    const { projectId = 'all' } = match.params

    return (
      <Query query={GET_PROJECTS}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return null

          const projects = data.project || []

          return (
            <Select
              classes={{ select: classes.select, icon: classes.downIcon }}
              value={projectId}
              onChange={this.handleProjectChange}
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
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(ProjectSelector)
