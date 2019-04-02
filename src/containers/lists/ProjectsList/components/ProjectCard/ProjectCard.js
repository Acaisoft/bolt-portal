import React from 'react'
import PropTypes from 'prop-types'

import {
  CardHeader,
  CircularProgress,
  IconButton,
  Chip,
  CardContent,
  Typography,
  CardActions,
  withStyles,
} from '@material-ui/core'
import { ButtonWithIcon } from '~components'

import { MoreHoriz, ChevronRight } from '@material-ui/icons'

import styles from './ProjectCard.styles'

const ProjectCard = ({ classes, project, onDetails, onMenuOpen }) => (
  <React.Fragment>
    <CardHeader
      className={classes.header}
      avatar={<CircularProgress value={project.progress} variant="static" />}
      action={
        <IconButton onClick={e => onMenuOpen(e, project)}>
          <MoreHoriz />
        </IconButton>
      }
      title={project.name}
      titleTypographyProps={{
        component: 'p',
        paragraph: true,
        style: { fontWeight: 'bold' },
      }}
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
ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onDetails: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    progress: PropTypes.number,
  }).isRequired,
}

export default withStyles(styles)(ProjectCard)
