import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'
import { ProjectsList } from '~containers/lists'
import { SectionHeader } from '~components'

import styles from './List.styles'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  handleDetails = ({ id }) => {
    const { history, match } = this.props
    history.push(`${match.url}/${id}`)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <SectionHeader title="Your Projects" subtitle="(4)" />
        <ProjectsList onDetails={this.handleDetails} />
      </div>
    )
  }
}

export default withStyles(styles)(List)
