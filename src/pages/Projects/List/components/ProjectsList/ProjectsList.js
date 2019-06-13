import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Card, Box } from '@material-ui/core'
import { ErrorPlaceholder, LoadingPlaceholder, SectionHeader } from '~components'

import { GET_PROJECT_SUMMARIES } from './graphql'
import { useQuery } from 'react-apollo-hooks'

import useStyles from './ProjectsList.styles'
import { BackgroundImage, ProjectFormInCard, NewProjectCard, ProjectCard } from '..'

function ProjectsList({ getProjectDetailsUrl }) {
  const classes = useStyles()
  const { summaries, loading, error } = useProjectSummaries()

  const {
    editedItem,
    handleClickCreate,
    handleClickEdit,
    handleFormClose,
  } = useProjectsListState()

  if (loading || error) {
    return (
      <Box p={2}>
        {loading ? (
          <LoadingPlaceholder title="Loading projects..." />
        ) : (
          <ErrorPlaceholder error={error} />
        )}
      </Box>
    )
  }

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
                    <NewProjectCard onCreate={handleClickCreate} />
                  ) : (
                    <ProjectCard
                      getProjectDetailsUrl={getProjectDetailsUrl}
                      onEdit={handleClickEdit}
                      project={project}
                    />
                  )}
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

ProjectsList.propTypes = {
  getProjectDetailsUrl: PropTypes.func.isRequired,
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

  const handleFormClose = useCallback(() => {
    setEditedItem(null)
  }, [])
  const handleClickCreate = useCallback(() => {
    setEditedItem({ id: 'new-project' })
  }, [])
  const handleClickEdit = useCallback(project => {
    setEditedItem(project)
  }, [])

  return {
    editedItem,
    handleFormClose,
    handleClickCreate,
    handleClickEdit,
  }
}

export default ProjectsList
