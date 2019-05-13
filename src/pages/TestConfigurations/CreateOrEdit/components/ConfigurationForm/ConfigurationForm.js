import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'

import { Field, Form } from 'react-final-form'
import { Button, Grid, MenuItem, withStyles, Typography } from '@material-ui/core'
import { FormField, CheckboxField } from '~containers'
import { ExpandablePanel, SectionHeader, Loader } from '~components'

import {
  makeEmptyInitialValues,
  validateForm,
  makeFlatValidationSchema,
} from '~utils/forms'
import { useMutationWithState } from '~hooks'

import {
  GET_CONFIGURATION,
  ADD_CONFIGURATION_MUTATION,
  EDIT_PERFORMED_CONFIGURATION_MUTATION,
  EDIT_CONFIGURATION_MUTATION,
} from './graphql'
import { useFormSchema, prepareInitialValues, preparePayload } from './formSchema'
import styles from './ConfigurationForm.styles'

export function ConfigurationForm({
  classes,
  mode,
  onCancel = () => {},
  onSubmit = () => {},
  configurationId,
  projectId,
}) {
  const { data: { configuration } = {}, loading: configurationLoading } = useQuery(
    GET_CONFIGURATION,
    {
      fetchPolicy: 'cache-and-network',
      variables: { configurationId },
      skip: mode !== 'edit',
    }
  )
  const isPerformed = Boolean(configuration && configuration.performed)

  const { fields, loading: fieldsLoading } = useFormSchema({ mode, projectId })

  const handleSubmit = useConfigurationSubmit({
    configurationId,
    projectId,
    mode,
    isPerformed,
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
      subscription={{ submitting: true, dirty: true, invalid: true }}
      keepDirtyOnReinitialize
    >
      {form => (
        <form onSubmit={form.handleSubmit}>
          <SectionHeader
            title={mode === 'create' ? 'New Scenario' : 'Update Scenario'}
            description={
              isPerformed
                ? 'We want to keep your data consistent and be able to prepare really precisely reports. This is why you can’t change the parameters of already performed scenarios.'
                : null
            }
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
          <ExpandablePanel defaultExpanded title="Scenario">
            <Grid container spacing={32}>
              <Grid item xs={6}>
                <FormField
                  name="scenario_name"
                  field={fields.scenario_name}
                  fullWidth
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  name="configuration_type"
                  field={fields.configuration_type}
                  disabled={isPerformed}
                  variant="filled"
                  fullWidth
                >
                  {fields.configuration_type.options.map(option => (
                    <MenuItem key={option.key} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </FormField>
              </Grid>
            </Grid>
          </ExpandablePanel>

          <ExpandablePanel defaultExpanded title="Scenario Parts">
            <Grid container spacing={16}>
              {Object.entries(fields.scenario_parts.fields).map(([name, field]) => (
                <Grid item xs={12} md={6} key={name}>
                  <FormField
                    name={`scenario_parts.${name}`}
                    field={field}
                    disabled={isPerformed}
                    type="checkbox"
                    component={CheckboxField}
                  />
                </Grid>
              ))}
            </Grid>
          </ExpandablePanel>

          <Field name="configuration_type" subscription={{ value: true }}>
            {({ input: { value: configurationType } }) => (
              <React.Fragment>
                <Field
                  type="checkbox"
                  name="scenario_parts.has_load_tests"
                  subscription={{ value: true }}
                >
                  {({ input: { value: hasLoadTests } }) => (
                    <ExpandablePanel
                      key={`${configurationType}-step2`} // Re-render to reinitialize defaultExpanded
                      defaultExpanded={Boolean(configurationType)}
                      title="Test Parameters"
                    >
                      <Grid container spacing={32}>
                        {!configurationType || !hasLoadTests ? (
                          <Grid item xs={12}>
                            <Typography variant="body1">
                              Select test type first to see available parameters list
                            </Typography>
                          </Grid>
                        ) : (
                          Object.entries(fields.parameters.fields || [])
                            .filter(
                              ([name, options]) =>
                                options.group === configurationType
                            )
                            .map(([id, options]) => (
                              <Grid key={id} item xs={6}>
                                <FormField
                                  name={`parameters.${id}`}
                                  field={options}
                                  disabled={isPerformed}
                                  fullWidth
                                  variant="filled"
                                />
                              </Grid>
                            ))
                        )}
                      </Grid>
                    </ExpandablePanel>
                  )}
                </Field>

                <ExpandablePanel
                  key={`${configurationType}-step3`} // Re-render to reinitialize defaultExpanded
                  defaultExpanded={Boolean(configurationType)}
                  title="Test Source"
                >
                  <Grid container spacing={32}>
                    {!configurationType ? (
                      <Grid item xs={12}>
                        <Typography variant="body1">
                          Select test type first to see test source options
                        </Typography>
                      </Grid>
                    ) : (
                      <React.Fragment>
                        <Grid item xs={6}>
                          <FormField
                            name="test_source_type"
                            field={fields.test_source_type}
                            disabled={isPerformed}
                            fullWidth
                            variant="filled"
                          >
                            {fields.test_source_type.options.map(option => (
                              <MenuItem key={option.key} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </FormField>
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            name="test_source_type"
                            subscription={{ value: true }}
                          >
                            {({ input: { value: selectedSourceType } }) => {
                              if (!selectedSourceType) {
                                return null
                              }

                              return (
                                <FormField
                                  name={`test_source.${selectedSourceType}`}
                                  field={
                                    fields.test_source.fields[selectedSourceType]
                                  }
                                  disabled={isPerformed}
                                  fullWidth
                                  variant="filled"
                                >
                                  {fields.test_source.fields[
                                    selectedSourceType
                                  ].options.map(option => (
                                    <MenuItem key={option.key} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </FormField>
                              )
                            }}
                          </Field>
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid>
                </ExpandablePanel>
              </React.Fragment>
            )}
          </Field>
        </form>
      )}
    </Form>
  )
}
ConfigurationForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  configurationId: PropTypes.string,
  projectId: PropTypes.string,
}

function useConfigurationSubmit({
  mode,
  isPerformed,
  configurationId,
  projectId,
  onSubmit,
}) {
  const { mutation: submitMutation } = useMutationWithState(
    mode === 'create'
      ? ADD_CONFIGURATION_MUTATION
      : isPerformed
      ? EDIT_PERFORMED_CONFIGURATION_MUTATION
      : EDIT_CONFIGURATION_MUTATION,
    {
      refetchQueries: [
        'getTestConfigurations',
        mode === 'edit' ? 'getConfiguration' : '',
      ],
    }
  )

  const handleSubmit = useCallback(
    async values => {
      const dbValues = preparePayload(values)

      let variables
      if (isPerformed) {
        variables = { id: configurationId, name: dbValues.name }
      } else {
        variables = dbValues

        if (mode === 'create') {
          variables.project_id = projectId
        } else {
          variables.id = configurationId
        }
      }

      const { errorMessage } = await submitMutation({ variables })

      onSubmit({ values, errorMessage })
    },
    [submitMutation, isPerformed, mode, configurationId, projectId, onSubmit]
  )

  return handleSubmit
}
export default withStyles(styles)(ConfigurationForm)
