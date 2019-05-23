import React from 'react'
import PropTypes from 'prop-types'

import {
  CardHeader,
  IconButton,
  Chip,
  CardContent,
  Typography,
  CardActions,
  withStyles,
} from '@material-ui/core'
import { ButtonWithIcon, SuccessRatePieChart } from '~components'

import { MoreHoriz, ChevronRight } from '@material-ui/icons'

import styles from './ProjectCard.styles'

function ProjectCard({ classes, project, onDetails, onMenuOpen }) {
  const { num_tests_passed, num_tests_failed } = project
  const tests_overall = num_tests_failed + num_tests_passed
  const progress =
    tests_overall === 0 ? tests_overall : (num_tests_passed / tests_overall) * 100
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
              label={`${project.num_scenarios} Test Scenarios`}
              className={classes.chip}
            />
            <Chip
              label={`${project.num_sources} Test Sources`}
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
