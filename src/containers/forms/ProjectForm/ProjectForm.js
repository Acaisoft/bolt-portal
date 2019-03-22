import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'

import { AppBar, Button, Typography, withStyles } from '@material-ui/core'
import { FormField } from '~components'

import { formFields, validationSchema } from './formSchema'
import styles from './ProjectForm.styles'

import {
  ADD_PROJECT_MUTATION,
  EDIT_PROJECT_MUTATION,
} from '~services/GraphQL/Mutations'
import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'

export class ProjectForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  handleSubmit = (values, { projectMutation }) => {
    const { name, description, image, id } = values
    try {
      projectMutation({
        variables: {
          id: this.props.type === 'create' ? undefined : id,
          name,
          description,
          img: image,
        },
      })
    } catch (err) {
      toast.error('An error has occured. Project was not created.')
    }
    this.props.onSubmit(values)
  }

  renderForm = ({ handleSubmit, isSubmitting, dirty }) => {
    const createMode = this.props.type === 'create'
    return (
      <React.Fragment>
        <AppBar className={this.props.classes.appBar} position="static">
          <Typography variant="h3">
            {createMode ? 'NEW PROJECT' : 'UPDATE PROJECT'}
          </Typography>
          <Typography variant="body1">
            {createMode
              ? 'Add new project to your library'
              : `Update ${this.props.initialValues.name} project data.`}
          </Typography>
        </AppBar>
        <form onSubmit={handleSubmit}>
          {Object.entries(formFields).map(([name, options]) => {
            return (
              <FormField
                key={name}
                name={name}
                label={options.label}
                margin="normal"
                fullWidth
                {...options.input}
              />
            )
          })}

          <Button
            color="primary"
            variant="text"
            disabled={isSubmitting}
            onClick={() => this.props.onCancel()}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!dirty || isSubmitting}
          >
            {createMode ? 'ADD CONFIGURATION' : 'UPDATE'}
          </Button>
        </form>
      </React.Fragment>
    )
  }

  render() {
    const { initialValues, type } = this.props

    return (
      <Mutation
        mutation={type === 'create' ? ADD_PROJECT_MUTATION : EDIT_PROJECT_MUTATION}
        refetchQueries={[{ query: GET_PROJECTS_QUERY }]}
      >
        {(projectMutation, { data }) => (
          <Formik
            initialValues={initialValues}
            onSubmit={values => this.handleSubmit(values, { projectMutation })}
            validationSchema={validationSchema}
          >
            {this.renderForm}
          </Formik>
        )}
      </Mutation>
    )
  }
}

export default withStyles(styles)(ProjectForm)
