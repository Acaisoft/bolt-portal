import React from 'react'
import PropTypes from 'prop-types'

import {
  CardHeader,
  IconButton,
  Chip,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core'
import { ButtonWithIcon, SuccessRatePieChart } from '~components'

import { MoreHoriz, ChevronRight } from '@material-ui/icons'

import useStyles from './ProjectCard.styles'

function ProjectCard({ project, onDetails, onMenuOpen }) {
  const {
    num_tests_passed = 0,
    num_tests_failed = 0,
    num_scenarios = 0,
    num_sources = 0,
  } = project
  const tests_overall = num_tests_failed + num_tests_passed
  const progress =
    tests_overall === 0 ? tests_overall : (num_tests_passed / tests_overall) * 100

  const classes = useStyles()

  return (
    <React.Fragment>
      <CardHeader
        className={classes.header}
        avatar={<SuccessRatePieChart value={progress} size={65} />}
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
            <Chip
              label={`${num_scenarios} Test Scenario${
                num_scenarios !== 1 ? 's' : ''
              }`}
              className={classes.chip}
            />
            <Chip
              label={`${num_sources} Test Source${num_sources !== 1 ? 's' : ''}`}
              className={classes.chip}
            />
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
}
ProjectCard.propTypes = {
  onDetails: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    progress: PropTypes.number,
  }).isRequired,
}

export default ProjectCard
