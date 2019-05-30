import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

import { Menu, MenuItem, Typography, withStyles, Card } from '@material-ui/core'
import { Loader, SectionHeader } from '~components'

import { GET_PROJECT_SUMMARIES } from './graphql'
import { useQuery } from 'react-apollo-hooks'

import styles from './ProjectsList.styles'
import { BackgroundImage, ProjectFormInCard, NewProjectCard, ProjectCard } from '..'

function ProjectsList({ classes, onDetails }) {
  const { summaries, loading, error } = useProjectSummaries()

  const {
    editedItem,
    menuAnchorEl,
    handleCreate,
    handleEdit,
    handleFormClose,
    handleMenuOpen,
    handleMenuClose,
  } = useProjectsListState()

  if (error) return <Typography variant="body1">Error :(</Typography>
  if (loading) return <Loader loading fill />

  const projectsItems = [{ id: 'new-project' }, ...summaries]

  return (
    <React.Fragment>
      <SectionHeader
        title="Your Projects"
        subtitle={`(${summaries.length})`}
        marginBottom
      />

      <div className={classes.gridContainer}>
        {projectsItems.map(project => {
          const isNewProject = project.id === 'new-project'
          const isEditedProject = editedItem && editedItem.id === project.id

          return (
            <div
              className={classNames({
                [classes.gridItem]: true,
                [classes.gridItemBig]: isEditedProject,
              })}
              key={project.id}
            >
              <Card
                aria-label="Project Form"
                className={classNames({
                  [classes.card]: true,
                  [classes.formCard]: isNewProject,
                })}
              >
                <div className={classes.newProjectContainer}>
                  <BackgroundImage url={project.image_url} />
                  {isEditedProject ? (
                    <ProjectFormInCard
                      initialValues={editedItem}
                      mode={isNewProject ? 'create' : 'edit'}
                      onCancel={handleFormClose}
                      onSubmit={handleFormClose}
                    />
                  ) : isNewProject ? (
                    <NewProjectCard onCreate={handleCreate} />
                  ) : (
                    <ProjectCard
                      onDetails={onDetails}
                      onMenuOpen={handleMenuOpen}
                      onMenuClose={handleMenuClose}
                      project={project}
                    />
                  )}
                </div>
              </Card>
            </div>
          )
        })}
      </div>

      <Menu
        id="project-menu"
        anchorEl={menuAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!menuAnchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit project</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

ProjectsList.propTypes = {
  onDetails: PropTypes.func.isRequired,
}

function useProjectSummaries() {
  const { data: { summaries = {} } = {}, loading, error } = useQuery(
    GET_PROJECT_SUMMARIES,
    {
      fetchPolicy: 'cache-and-network',
    }
  )

  return { loading, error, summaries: summaries.projects || [] }
}

function useProjectsListState() {
  const [editedItem, setEditedItem] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  const handleMenuOpen = useCallback((e, project) => {
    setSelectedItem(project)
    setMenuAnchorEl(e.currentTarget)
  }, [])
  const handleMenuClose = useCallback(() => {
    setMenuAnchorEl(null)
  }, [])
  const handleFormClose = useCallback(() => {
    setSelectedItem(null)
    setEditedItem(null)
    handleMenuClose()
  })
  const handleCreate = useCallback(() => {
    setEditedItem({ id: 'new-project' })
  }, [])
  const handleEdit = useCallback(() => {
    setEditedItem(selectedItem)
    handleMenuClose()
  }, [selectedItem])

  return {
    editedItem,
    menuAnchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleFormClose,
    handleCreate,
    handleEdit,
  }
}

export default withStyles(styles)(ProjectsList)
