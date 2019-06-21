import React from 'react'
import PropTypes from 'prop-types'

import {
  CardHeader,
  IconButton,
  Chip,
  CardContent,
  Typography,
  CardActions,
  MenuItem,
} from '@material-ui/core'
import {
  Button,
  //  SuccessRatePieChart,
  PopoverMenu,
} from '~components'

import { MoreHoriz, ChevronRight } from '@material-ui/icons'

import useStyles from './ProjectCard.styles'
import { useTheme } from '@material-ui/styles'

function ProjectCard({ project, getProjectDetailsUrl, onEdit }) {
  const theme = useTheme()

  const {
    // num_tests_passed = 0,
    // num_tests_failed = 0,
    num_scenarios = 0,
    num_sources = 0,
  } = project
  // const tests_overall = num_tests_failed + num_tests_passed
  // const progress =
  //   tests_overall === 0 ? tests_overall : (num_tests_passed / tests_overall) * 100

  const classes = useStyles()

  return (
    <React.Fragment>
      <CardHeader
        className={classes.header}
        // avatar={<SuccessRatePieChart value={progress} size={65} showLabel={true} />}
        action={
          <PopoverMenu
            id={`project-${project.id}`}
            closeOnClick
            trigger={
              <IconButton aria-label="Project Menu">
                <MoreHoriz />
              </IconButton>
            }
          >
            <MenuItem onClick={() => onEdit(project)}>Edit project</MenuItem>
          </PopoverMenu>
        }
        title={project.name}
        titleTypographyProps={{
          component: 'p',
          paragraph: true,
          style: { fontWeight: 'bold', fontSize: theme.typography.body1.fontSize },
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
          <Typography
            color="textSecondary"
            component="p"
            variant="body1"
            gutterBottom
          >
            {project.description.length > 200
              ? `${project.description.slice(0, 200)}...`
              : project.description}
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          href={getProjectDetailsUrl(project)}
          icon={ChevronRight}
        >
          More
        </Button>
      </CardActions>
    </React.Fragment>
  )
}
ProjectCard.propTypes = {
  getProjectDetailsUrl: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    progress: PropTypes.number,
  }).isRequired,
}

export default ProjectCard
