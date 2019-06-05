import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-final-form'
import { Mutation } from 'react-apollo'

import { createFormConfig } from './formSchema'
import { validateForm, mutators } from '~utils/forms'
import { ADD_PROJECT, EDIT_PROJECT } from './graphql'
import { useNotification } from '~hooks'

export function ProjectForm({
  children,
  initialValues,
  mode = 'create',
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const notify = useNotification()

  const handleSubmit = useCallback(async (values, { projectMutation }) => {
    const { id, name, description, image_url } = values

    try {
      await projectMutation({
        variables: {
          id: mode === 'create' ? undefined : id,
          name,
          description,
          image_url,
        },
      })
      onSubmit(values)
    } catch (err) {
      notify.error(err.message)
    }
  }, [])

  const formConfig = useMemo(() => createFormConfig(), [])

  return (
    <Mutation
      mutation={mode === 'create' ? ADD_PROJECT : EDIT_PROJECT}
      refetchQueries={['getProjectCards']}
    >
      {(projectMutation, { data }) => (
        <Form
          initialValues={initialValues}
          mutators={{ ...mutators }}
          onSubmit={values => handleSubmit(values, { projectMutation })}
          validate={validateForm(formConfig.validationSchema)}
        >
          {form => children({ form, fields: formConfig.fields })}
        </Form>
      )}
    </Mutation>
  )
}

ProjectForm.propTypes = {
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  mode: PropTypes.oneOf(['create', 'edit']),
}

export default ProjectForm
