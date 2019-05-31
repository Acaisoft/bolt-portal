import React from 'react'
import PropTypes from 'prop-types'

import { CardContent, CardActions } from '@material-ui/core'
import { ButtonWithIcon } from '~components'

import { Add } from '@material-ui/icons'
import { CreateProject } from '~assets/icons'

import useStyles from './NewProjectCard.styles'

function NewProjectCard({ onCreate }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CardContent className={classes.content}>
        <CreateProject height={97} />
      </CardContent>
      <CardActions className={classes.actions}>
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
}
NewProjectCard.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default NewProjectCard
