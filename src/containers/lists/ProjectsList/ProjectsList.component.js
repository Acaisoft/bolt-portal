import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  withStyles,
  CardHeader,
  IconButton,
  Chip,
  CircularProgress,
} from '@material-ui/core'
import { Add, ChevronRight, MoreHoriz } from '@material-ui/icons'

import { ButtonWithIcon, Loading } from '~components'
import { ProjectForm } from '~containers/forms'
import { CreateProject } from '~assets/icons'

import styles from './ProjectsList.component.styles'

const NewProjectCard = ({ classes, onCreate }) => (
  <React.Fragment>
    <CardContent className={classes.newProjectContent}>
      <CreateProject height={97} />
    </CardContent>
    <CardActions className={classes.newProjectActions}>
      <ButtonWithIcon
        color="secondary"
        variant="contained"
        onClick={onCreate}
        icon={Add}
      >
        New
      </ButtonWithIcon>
    </CardActions>
  </React.Fragment>
)

const ProjectCard = ({ classes, project, onDetails, onMenuOpen }) => (
  <React.Fragment>
    <CardHeader
      className={classes.cardHeader}
      avatar={<CircularProgress value={project.progress} variant="static" />}
      action={
        <IconButton onClick={e => onMenuOpen(e, project)}>
          <MoreHoriz />
        </IconButton>
      }
      title={project.name}
      titleTypographyProps={{ component: 'p', paragraph: true }}
      subheader={
        <div className={classes.chips}>
          <Chip label="13 Test Scenarios" className={classes.chip} />
          <Chip label="13 Test Sources" className={classes.chip} />
        </div>
      }
    />
    <CardContent className={classes.grow}>
      {project.description && (
        <Typography component="p" variant="body1" gutterBottom>
          {project.description.length > 200
            ? `${project.description.slice(0, 200)}...`
            : project.description}
        </Typography>
      )}
    </CardContent>
    <CardActions className={classes.actions}>
      <ButtonWithIcon
        variant="contained"
        color="primary"
        onClick={() => onDetails(project)}
        className={classes.actionButton}
        icon={ChevronRight}
      >
        More
      </ButtonWithIcon>
    </CardActions>
  </React.Fragment>
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
              <ProjectForm
                initialValues={editedItem}
                mode="create"
                onCancel={onFormCancel}
                onSubmit={onFormSubmit}
              />
            ) : (
              <NewProjectCard classes={classes} onCreate={onCreate} />
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
              <ProjectForm
                initialValues={editedItem}
                mode="edit"
                onCancel={onFormCancel}
                onSubmit={onFormSubmit}
              />
            ) : (
              <ProjectCard
                classes={classes}
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
