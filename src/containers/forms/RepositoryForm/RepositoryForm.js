import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'

import { toast } from 'react-toastify'
import { Button, withStyles } from '@material-ui/core'
import { FormField } from '~components'

import { formFields, validationSchema } from './formSchema'
import styles from './RepositoryForm.styles'

import {
  ADD_REPOSITORY_MUTATION,
  EDIT_REPOSITORY_MUTATION,
} from '~services/GraphQL/Mutations'
import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'

export class RepositoryForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    mode: PropTypes.oneOf(['create', 'edit']),
    onSubmit: PropTypes.func,
    projectId: PropTypes.string,
  }

  static defaultProps = {
    mode: 'create',
    onSubmit: () => {},
  }

  handleSubmit = (values, { repoMutation }) => {
    const { id, name, url } = values
    try {
      const variables = {
        name,
        url,
      }

      if (this.props.mode === 'create') {
        variables.projectId = this.props.projectId
      } else {
        variables.id = id
      }

      repoMutation({ variables })
    } catch (err) {
      toast.error('An error has occured. Project was not created.')
    }

    this.props.onSubmit(values)
  }

  render() {
    const { initialValues, onCancel, mode } = this.props
    return (
      <Mutation
        mutation={
          mode === 'create' ? ADD_REPOSITORY_MUTATION : EDIT_REPOSITORY_MUTATION
        }
        refetchQueries={[{ query: GET_REPOSITORIES_QUERY }]}
      >
        {(repoMutation, { data }) => (
          <Formik
            initialValues={initialValues}
            onSubmit={values => this.handleSubmit(values, { repoMutation })}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting, dirty }) => (
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
                  variant="contained"
                  onClick={this.handleModalOpen}
                >
                  GENERATE KEY
                </Button>

                <Button
                  color="primary"
                  variant="text"
                  disabled={isSubmitting}
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
                  {mode === 'create' ? 'Add repository' : 'Update'}
                </Button>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    )
  }
}

export default withStyles(styles)(RepositoryForm)
