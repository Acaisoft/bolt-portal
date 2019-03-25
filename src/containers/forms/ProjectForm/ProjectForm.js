import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'

import { Button, withStyles } from '@material-ui/core'
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
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    mode: PropTypes.oneOf(['create', 'edit']),
  }

  static defaultProps = {
    mode: 'create',
    onCancel: () => {},
    onSubmit: () => {},
  }

  handleSubmit = async (values, { projectMutation }) => {
    const { id, name, description } = values
    try {
      await projectMutation({
        variables: {
          id: this.props.mode === 'create' ? undefined : id,
          name,
          description,
        },
      })
      this.props.onSubmit(values)
    } catch (err) {
      toast.error(err.message)
    }
  }

  render() {
    const { initialValues, mode } = this.props

    return (
      <Mutation
        mutation={mode === 'create' ? ADD_PROJECT_MUTATION : EDIT_PROJECT_MUTATION}
        refetchQueries={[{ query: GET_PROJECTS_QUERY }]}
      >
        {(projectMutation, { data }) => (
          <Formik
            initialValues={initialValues}
            onSubmit={values => this.handleSubmit(values, { projectMutation })}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting, dirty }) => {
              return (
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
                    {mode === 'create' ? 'ADD CONFIGURATION' : 'UPDATE'}
                  </Button>
                </form>
              )
            }}
          </Formik>
        )}
      </Mutation>
    )
  }
}

export default withStyles(styles)(ProjectForm)
