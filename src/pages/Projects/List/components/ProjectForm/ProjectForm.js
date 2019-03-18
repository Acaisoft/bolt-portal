import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'

import { AppBar, Button, Drawer, Typography, withStyles } from '@material-ui/core'

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
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    courseInitData: PropTypes.object,
  }

  handleSubmit = (values, { projectMutation }) => {
    const { name, description, image } = values
    try {
      if (this.props.type === 'create') {
        projectMutation({ variables: { name, description, img: image } })
      } else {
        projectMutation({
          variables: { name, description, img: image, id: values.id },
        })
      }
    } catch (err) {
      toast.error('An error has occured. Project was not created.')
    }
    this.props.close(null, false)
  }

  renderForm = ({ handleSubmit, isSubmitting, dirty }) => (
    <React.Fragment>
      <AppBar className={this.props.classes.appBar} position="static">
        <Typography variant="h3">
          {this.props.type === 'create' ? 'NEW PROJECT' : 'UPDATE PROJECT'}
        </Typography>
        <Typography variant="body1">
          {this.props.type === 'create'
            ? 'Add new project to your library'
            : `Update ${this.props.courseInitData.name} project data.`}
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
          onClick={() => this.props.close(null, false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!dirty || isSubmitting}
        >
          {this.props.type === 'create' ? 'ADD CONFIGURATION' : 'UPDATE'}
        </Button>
      </form>
    </React.Fragment>
  )

  render() {
    const { classes, open, courseInitData, type } = this.props

    return (
      <div>
        <Drawer
          open={open}
          anchor="right"
          classes={{
            paper: classes.drawer,
          }}
        >
          <Mutation
            mutation={
              type === 'create' ? ADD_PROJECT_MUTATION : EDIT_PROJECT_MUTATION
            }
            refetchQueries={[{ query: GET_PROJECTS_QUERY }]}
          >
            {(projectMutation, { data }) => (
              <Formik
                initialValues={courseInitData}
                onSubmit={values => this.handleSubmit(values, { projectMutation })}
                validationSchema={validationSchema}
              >
                {this.renderForm}
              </Formik>
            )}
          </Mutation>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(ProjectForm)
