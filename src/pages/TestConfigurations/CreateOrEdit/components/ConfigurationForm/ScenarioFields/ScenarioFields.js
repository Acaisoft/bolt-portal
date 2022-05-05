import React from 'react'
import { Grid, MenuItem } from '@material-ui/core'
import { FormField } from 'containers'
import { ExpandablePanel } from 'components'

function ScenarioFields({ fields }) {
  return (
    <ExpandablePanel defaultExpanded title="Scenario">
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormField
            id="scenario_name"
            name="scenario_name"
            field={fields.scenario_name}
            fullWidth
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormField
            aria-label="configuration type select"
            id="configuration_type"
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
  )
}

export default ScenarioFields
