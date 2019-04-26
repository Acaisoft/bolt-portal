import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

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
    onChange: PropTypes.func.isRequired,
    projectId: PropTypes.string,
  }

  handleProjectChange = e => {
    const { onChange } = this.props

    const newId = e.target.value
    onChange(newId === 'all' ? undefined : newId)
  }

  render() {
    const { classes, projectId } = this.props

    return (
      <Query query={GET_PROJECTS}>
        {({ data, loading, error }) => {
          if (loading) return <Loader loading fill />
          if (error) return null

          const projects = data.project || []

          return (
            <Select
              classes={{ select: classes.select, icon: classes.downIcon }}
              value={projectId || 'all'}
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
