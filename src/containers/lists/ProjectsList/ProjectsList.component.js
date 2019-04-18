import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Anime from 'react-anime'

import { Card, withStyles } from '@material-ui/core'

import { Loader } from '~components'

import { NewProjectCard, ProjectCard, ProjectFormInCard } from './components'
import styles from './ProjectsList.component.styles'

const withAnime = (component, animationProps) => {
  return <Anime {...animationProps}>{component}</Anime>
}

const getStyleForFadedBackground = url =>
  url && (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: `url(${url})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.2,
        borderRadius: 16,
      }}
    />
  )

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
  if (loading) return <Loader loading fill />

  const PrimeTile = (
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
  )

  const animeProps = {
    duration: 400,
    scale: [0.2, 1],
    easing: 'easeInOutElastic',
  }
  return (
    <div className={classes.gridContainer}>
      {editedItem && editedItem.id === 'new-project'
        ? withAnime(PrimeTile, animeProps)
        : PrimeTile}
      {projects.map(project => (
        <div
          className={classNames({
            [classes.gridItem]: true,
            [classes.gridItemBig]: editedItem && editedItem.id === project.id,
          })}
          key={project.id}
        >
          <Card aria-label="Project Details" className={classes.card}>
            {getStyleForFadedBackground(project.image_url)}
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
