import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Grid, MenuItem, withStyles } from '@material-ui/core'
import { FormField } from '~containers'
import { TestConfigurationForm } from '~containers/forms'
import { ExpandablePanel, SectionHeader } from '~components'

import styles from './ConfigurationForm.styles'

export class ConfigurationForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    configurationId: PropTypes.string,
    projectId: PropTypes.string,
  }

  static defaultProps = {
    onCancel: () => {},
    onSubmit: () => {},
  }

  render() {
    const { classes, onCancel, onSubmit, configurationId, projectId } = this.props
    const mode = configurationId ? 'edit' : 'create'

    return (
      <TestConfigurationForm
        mode={mode}
        configurationId={configurationId}
        projectId={projectId}
        onSubmit={onSubmit}
      >
        {({ form, fields }) => (
          <form onSubmit={form.handleSubmit}>
            <SectionHeader
              title={mode === 'create' ? 'New Scenario' : 'Update Scenario'}
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
                disabled={!form.dirty || form.isSubmitting}
                className={classes.button}
              >
                {mode === 'create' ? 'Create' : 'Update'}
              </Button>
            </SectionHeader>
            <ExpandablePanel defaultExpanded title="1. Scenario">
              <Grid container spacing={32}>
                <Grid item xs={6}>
                  <FormField
                    name="name"
                    field={fields.name}
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

            <ExpandablePanel defaultExpanded title="2. Test Parameters">
              <Grid container spacing={32}>
                {Object.entries(fields.parameters.fields || [])
                  .filter(
                    ([name, options]) =>
                      options.group === form.values.configuration_type
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
                  ))}
              </Grid>
            </ExpandablePanel>
          </form>
        )}
      </TestConfigurationForm>
    )
  }
}

export default withStyles(styles)(ConfigurationForm)
