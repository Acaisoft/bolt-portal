import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'

import { Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import {
  Grid,
  MenuItem,
  Typography,
  IconButton,
  FormHelperText,
} from '@material-ui/core'
import { FormField, CheckboxField, FormValue } from 'containers'
import { ExpandablePanel, SectionHeader, Loader, Button } from 'components'
import { Delete, Add } from '@material-ui/icons'

import {
  makeEmptyInitialValues,
  validateForm,
  makeFlatValidationSchema,
  requireWhenOtherIsSet,
  composeValidators,
  uniqueInArray,
} from 'utils/forms'
import { useMutationWithState } from 'hooks'

import {
  GET_CONFIGURATION,
  ADD_CONFIGURATION_MUTATION,
  EDIT_CONFIGURATION_MUTATION,
} from './graphql'
import { useFormSchema, prepareInitialValues, preparePayload } from './formSchema'
import useStyles from './ConfigurationForm.styles'

const testsPerformedMessage =
  'You cannot change test source - a test has been performed'

export function ConfigurationForm({
  mode,
  onCancel = () => {},
  onSubmit = () => {},
  configurationId,
  projectId,
}) {
  const classes = useStyles()

  const { data: { configuration } = {}, loading: configurationLoading } = useQuery(
    GET_CONFIGURATION,
    {
      fetchPolicy: 'cache-and-network',
      variables: { configurationId },
      skip: mode !== 'edit',
    }
  )

  const { fields, loading: fieldsLoading } = useFormSchema({ mode, projectId })

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
          <ExpandablePanel defaultExpanded title="Scenario">
            <Grid container spacing={4}>
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
                  variant="filled"
                  fullWidth
                  // TODO: remove disabled prop when more options will be added
                  disabled
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
            <Grid container spacing={2}>
              {Object.entries(fields.scenario_parts.fields).map(([name, field]) => (
                <Grid item xs={12} md={6} key={name}>
                  <FormField
                    name={`scenario_parts.${name}`}
                    field={field}
                    type="checkbox"
                    component={CheckboxField}
                  />
                </Grid>
              ))}
            </Grid>
          </ExpandablePanel>

          <FormValue name="configuration_type">
            {configurationType => (
              <React.Fragment>
                <FormValue name="scenario_parts">
                  {scenarioParts => (
                    <ExpandablePanel
                      key={`${configurationType}-step2`} // Re-render to reinitialize defaultExpanded
                      defaultExpanded={Boolean(configurationType)}
                      title="Test Parameters"
                    >
                      <Grid container spacing={4}>
                        {!configurationType ||
                        (!scenarioParts?.has_load_tests &&
                          !scenarioParts?.has_monitoring) ? (
                          <Grid item xs={12}>
                            <Typography variant="body1">
                              Select test type and scenario parts to see available
                              parameters list
                            </Typography>
                          </Grid>
                        ) : (
                          Object.entries(fields.parameters.fields || [])
                            .filter(
                              ([name, options]) =>
                                options.group === configurationType &&
                                scenarioParts?.[`has_${options.scenarioPart}`]
                            )
                            .map(([id, options]) => (
                              <Grid key={id} item xs={6}>
                                <FormField
                                  name={`parameters.${id}`}
                                  field={options}
                                  fullWidth
                                  variant="filled"
                                />
                              </Grid>
                            ))
                        )}
                      </Grid>
                    </ExpandablePanel>
                  )}
                </FormValue>

                <ExpandablePanel
                  key={`${configurationType}-step3`} // Re-render to reinitialize defaultExpanded
                  defaultExpanded={Boolean(configurationType)}
                  title="Test Source"
                >
                  <Grid container spacing={4}>
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
                            fullWidth
                            variant="filled"
                            // TODO: remove disabled prop when more options will be added
                            disabled
                          >
                            {fields.test_source_type.options.map(option => (
                              <MenuItem key={option.key} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </FormField>
                        </Grid>
                        <Grid item xs={6}>
                          <FormValue name="test_source_type">
                            {selectedSourceType => {
                              if (!selectedSourceType) {
                                return null
                              }

                              return (
                                <FormField
                                  name={`test_source.${selectedSourceType}`}
                                  field={
                                    fields.test_source.fields[selectedSourceType]
                                  }
                                  fullWidth
                                  variant="filled"
                                  disabled={configuration?.performed}
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
                          </FormValue>

                          {!!configuration?.performed && (
                            <FormHelperText>{testsPerformedMessage}</FormHelperText>
                          )}
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid>
                </ExpandablePanel>
              </React.Fragment>
            )}
          </FormValue>

          <ExpandablePanel defaultExpanded title="Environment Variables">
            <FieldArray name="configuration_envvars">
              {({ fields: arrayFields }) => (
                <Grid container spacing={4}>
                  {arrayFields.map((name, index) => (
                    <React.Fragment key={name}>
                      <Grid item xs={12} md={5}>
                        <FormField
                          name={`${name}.name`}
                          field={{ inputProps: { label: 'Key' } }}
                          fullWidth
                          variant="filled"
                          validate={composeValidators(
                            requireWhenOtherIsSet(`${name}.value`),
                            uniqueInArray('configuration_envvars', 'name')
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormField
                          name={`${name}.value`}
                          field={{ inputProps: { label: 'Value' } }}
                          fullWidth
                          variant="filled"
                          validate={requireWhenOtherIsSet(`${name}.name`)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <IconButton
                          variant="outlined"
                          color="default"
                          onClick={() =>
                            form.form.mutators.remove('configuration_envvars', index)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </React.Fragment>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      onClick={() =>
                        form.form.mutators.push('configuration_envvars', undefined)
                      }
                      variant="contained"
                      color="default"
                      icon={Add}
                    >
                      Add a variable
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
          </ExpandablePanel>
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

function useConfigurationSubmit({ mode, configurationId, projectId, onSubmit }) {
  const { mutation: submitMutation } = useMutationWithState(
    mode === 'create' ? ADD_CONFIGURATION_MUTATION : EDIT_CONFIGURATION_MUTATION,
    {
      refetchQueries: [
        'getTestConfigurations',
        mode === 'edit' ? 'getConfiguration' : '',
      ],
    }
  )

  const handleSubmit = useCallback(
    async values => {
      const variables = preparePayload(values, {
        mode,
        configurationId,
        projectId,
      })
      const { errorMessage } = await submitMutation({ variables })
      onSubmit({ values, errorMessage })
    },
    [submitMutation, mode, configurationId, projectId, onSubmit]
  )

  return handleSubmit
}
export default ConfigurationForm
