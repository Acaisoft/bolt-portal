import React, { Component } from 'react'

import { Typography } from '@material-ui/core'
import { RepositoryForm } from '~containers/forms'

export class Create extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Typography variant="h6">Test Source Data</Typography>
        <Typography variant="body1">
          Here you can define your new test run source, you can edit the data until
          first test run. After that you will be able only to change configuration
          name.
        </Typography>

        <RepositoryForm mode="create" />
      </div>
    )
  }
}

export default Create
