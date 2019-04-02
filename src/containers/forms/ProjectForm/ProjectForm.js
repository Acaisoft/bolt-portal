import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-final-form'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'

import { createFormConfig } from './formSchema'

import { validateForm, mutators } from '~utils/forms'
import {
  ADD_PROJECT_MUTATION,
  EDIT_PROJECT_MUTATION,
} from '~services/GraphQL/Mutations'
import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'

export class ProjectForm extends Component {
  static propTypes = {
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
    const { id, name, description, image_url } = values

    try {
      await projectMutation({
        variables: {
          id: this.props.mode === 'create' ? undefined : id,
          name,
          description,
          image_url,
        },
      })
      this.props.onSubmit(values)
    } catch (err) {
      toast.error(err.message)
    }
  }

  render() {
    const { children, initialValues, mode } = this.props

    const formConfig = createFormConfig()

    return (
      <Mutation
        mutation={mode === 'create' ? ADD_PROJECT_MUTATION : EDIT_PROJECT_MUTATION}
        refetchQueries={[{ query: GET_PROJECTS_QUERY }]}
      >
        {(projectMutation, { data }) => (
          <Form
            initialValues={initialValues}
            mutators={{ ...mutators }}
            onSubmit={values => this.handleSubmit(values, { projectMutation })}
            validate={validateForm(formConfig.validationSchema)}
          >
            {form => children({ form, fields: formConfig.fields })}
          </Form>
        )}
      </Mutation>
    )
  }
}

export default ProjectForm
