import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Grid, MenuItem, withStyles } from '@material-ui/core'
import { FormField } from '~containers'
import { TestConfigurationForm } from '~containers/forms'
import { ExpandablePanel, SectionHeader } from '~components'

import styles from './CreateOrEdit.styles'

export class CreateOrEdit extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        configurationId: PropTypes.string,
        projectId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  handleCancel = () => {
    this.props.history.goBack()
  }

  handleSubmit = () => {
    const { history, match } = this.props
    history.push(`/projects/${match.projectId}/test-configurations`)
  }

  render() {
    const { classes, match } = this.props
    const { configurationId, projectId } = match.params

    const mode = configurationId ? 'edit' : 'create'

    return (
      <div>
        <TestConfigurationForm
          mode={mode}
          configurationId={configurationId}
          projectId={projectId}
          onSubmit={this.handleSubmit}
        >
          {({ form, fields }) => (
            <form onSubmit={form.handleSubmit}>
              <Grid container justify="space-between" alignItems="center">
                <SectionHeader
                  title={mode === 'create' ? 'New Scenario' : 'Update Scenario'}
                />

                <Grid item>
                  <Grid container alignItems="center">
                    <Button
                      color="default"
                      variant="text"
                      disabled={form.isSubmitting}
                      onClick={this.handleCancel}
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
                  </Grid>
                </Grid>
              </Grid>
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
      </div>
    )
  }
}

export default withStyles(styles)(CreateOrEdit)
