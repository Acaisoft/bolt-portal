import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardContent,
  Grid,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import styles from './ProjectsList.component.styles'

function ProjectsList({ classes, onDetails, onEdit, projects }) {
  return (
    <Grid container spacing={24}>
      {projects.map(project => (
        <Grid item xs={3} key={project.id}>
          <Card
            className={classes.card}
            onClick={() => {
              onDetails(project)
            }}
            aria-label="Project Details"
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {project.name}
              </Typography>
              {project.description && (
                <Typography variant="body1">
                  {project.description.length > 200
                    ? `${project.description.slice(0, 200)}...`
                    : project.description}
                </Typography>
              )}
              <IconButton
                className={classes.editIcon}
                onClick={e => {
                  e.stopPropagation()
                  onEdit(project)
                }}
              >
                <Edit />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
ProjectsList.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  onDetails: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectsList)
