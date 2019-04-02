import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Card, withStyles } from '@material-ui/core'

import { Loading } from '~components'

import { NewProjectCard, ProjectCard, ProjectFormInCard } from './components'
import styles from './ProjectsList.component.styles'

const ProjectsList = ({
  classes,
  editedItem = {},
  loading,
  onCreate,
  onDetails,
  onMenuOpen,
  onMenuClose,
  onFormCancel,
  onFormSubmit,
  projects = [],
}) => {
  if (loading) return <Loading />

  return (
    <div className={classes.gridContainer}>
      <div
        className={classNames({
          [classes.gridItem]: true,
          [classes.gridItemBig]: editedItem && editedItem.id === 'new-project',
        })}
        key="new_project"
      >
        <Card
          aria-label="Project Form"
          className={classNames(classes.card, classes.formCard)}
        >
          <div className={classes.newProjectContainer}>
            {editedItem && editedItem.id === 'new-project' ? (
              <ProjectFormInCard
                initialValues={editedItem}
                mode="create"
                onCancel={onFormCancel}
                onSubmit={onFormSubmit}
              />
            ) : (
              <NewProjectCard onCreate={onCreate} />
            )}
          </div>
        </Card>
      </div>
      {projects.map(project => (
        <div
          className={classNames({
            [classes.gridItem]: true,
            [classes.gridItemBig]: editedItem && editedItem.id === project.id,
          })}
          key={project.id}
        >
          <Card aria-label="Project Details" className={classes.card}>
            {editedItem && editedItem.id === project.id ? (
              <ProjectFormInCard
                initialValues={editedItem}
                mode="edit"
                onCancel={onFormCancel}
                onSubmit={onFormSubmit}
              />
            ) : (
              <ProjectCard
                onDetails={onDetails}
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                project={project}
              />
            )}
          </Card>
        </div>
      ))}
    </div>
  )
}

ProjectsList.propTypes = {
  classes: PropTypes.object.isRequired,
  editedItem: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  onFormCancel: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onMenuClose: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func.isRequired,
  projects: PropTypes.array,
}

export default withStyles(styles)(ProjectsList)
