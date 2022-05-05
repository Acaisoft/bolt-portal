import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { SectionHeader, Loader, Button } from 'components'
import {
  makeEmptyInitialValues,
  validateForm,
  makeFlatValidationSchema,
} from 'utils/forms'
import { GET_CONFIGURATION } from './graphql'
import { useFormSchema, prepareInitialValues } from './formSchema'
import ConfigurationTypeFields from './ConfigurarionTypeFields'
import ScenarioFields from './ScenarioFields'
import ScenarioPartsFields from './ScenarioPartsFields'
import EnvVariablesFields from './EnvVariablesFields'
import { useConfigurationSubmit } from './ConfigurationForm.utils'
import useStyles from './ConfigurationForm.styles'

export function ConfigurationForm({ onCancel = () => {}, onSubmit = () => {} }) {
  const { configurationId, projectId } = useParams()
  const mode = configurationId ? 'edit' : 'create'
  const classes = useStyles()

  const { data: { configuration } = {}, loading: configurationLoading } = useQuery(
    GET_CONFIGURATION,
    {
      fetchPolicy: 'cache-and-network',
      variables: { configurationId },
      skip: mode !== 'edit',
    }
  )

  const { fields, loading: fieldsLoading } = useFormSchema({ projectId })

  const handleSubmit = useConfigurationSubmit({
    configurationId,
    projectId,
    mode,
    onSubmit,
  })
  const handleValidate = useCallback(
    values => validateForm(values, makeFlatValidationSchema(fields)),
    [fields]
  )

  const initialValues = useMemo(
    () => makeEmptyInitialValues(fields, prepareInitialValues(configuration)),
    [fields, configuration]
  )

  if (fieldsLoading || configurationLoading) {
    return <Loader loading />
  }
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={handleValidate}
      mutators={{ ...arrayMutators }}
      subscription={{ submitting: true, dirty: true, invalid: true }}
      keepDirtyOnReinitialize
    >
      {form => (
        <form data-testid="ConfigurationForm" onSubmit={form.handleSubmit}>
          <SectionHeader
            title={mode === 'create' ? 'New Scenario' : 'Update Scenario'}
            alignItems="flex-start"
            marginBottom
          >
            <Button
              color="default"
              variant="text"
              disabled={form.isSubmitting}
              onClick={onCancel}
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={!form.dirty || form.isSubmitting || form.invalid}
              className={classes.button}
            >
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </SectionHeader>

          <ScenarioFields fields={fields} />
          <ScenarioPartsFields fields={fields} />
          <ConfigurationTypeFields fields={fields} configuration={configuration} />
          <EnvVariablesFields />
        </form>
      )}
    </Form>
  )
}

ConfigurationForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default ConfigurationForm
