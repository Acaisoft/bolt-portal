import React from 'react'
import { FormHelperText, Grid, MenuItem, Typography } from '@material-ui/core'
import { FormField, FormValue } from 'containers'
import { ExpandablePanel } from 'components'
import { testsPerformedMessage } from '../ConfigurationForm.utils'

function ConfigurationTypeFields({ fields, configuration }) {
  return (
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
                        ([, options]) =>
                          options.group === configurationType &&
                          scenarioParts?.[`has_${options.scenarioPart}`]
                      )
                      .map(([id, options]) => (
                        <Grid key={id} item xs={6}>
                          <FormField
                            id={`parameters.${id}`}
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
                      aria-label="test source type select"
                      id="test_source_type"
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
                            aria-label={`test source ${selectedSourceType} select`}
                            id={`test_source.${selectedSourceType}`}
                            name={`test_source.${selectedSourceType}`}
                            field={fields.test_source.fields[selectedSourceType]}
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

                  <Grid item xs={6}>
                    <FormValue name="test_source_type">
                      {selectedSourceType => {
                        if (!selectedSourceType) {
                          return null
                        }

                        return (
                          <FormField
                            id="test_source.load_tests_repository_branch"
                            name="test_source.load_tests_repository_branch"
                            field={
                              fields.test_source.fields.load_tests_repository_branch
                            }
                            fullWidth
                            variant="filled"
                            disabled={configuration?.performed}
                          />
                        )
                      }}
                    </FormValue>
                  </Grid>

                  <Grid item xs={6}>
                    <FormValue name="test_source_type">
                      {selectedSourceType => {
                        if (!selectedSourceType) {
                          return null
                        }

                        return (
                          <FormField
                            id="test_source.load_tests_file_name"
                            name="test_source.load_tests_file_name"
                            field={fields.test_source.fields.load_tests_file_name}
                            fullWidth
                            variant="filled"
                            disabled={configuration?.performed}
                          />
                        )
                      }}
                    </FormValue>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </ExpandablePanel>
        </React.Fragment>
      )}
    </FormValue>
  )
}

export default ConfigurationTypeFields
