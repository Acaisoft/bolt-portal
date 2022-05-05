import React from 'react'
import { Grid } from '@material-ui/core'
import { CheckboxField, FormField } from 'containers'
import { ExpandablePanel } from 'components'

function ScenarioPartsFields({ fields }) {
  return (
    <ExpandablePanel defaultExpanded title="Scenario Parts">
      <Grid container spacing={2}>
        {Object.entries(fields.scenario_parts.fields).map(([name, field]) => (
          <Grid item xs={12} md={6} key={name}>
            <FormField
              id={`scenario_parts.${name}`}
              name={`scenario_parts.${name}`}
              field={field}
              type="checkbox"
              component={CheckboxField}
              disabled={name === 'has_load_tests'}
            />
          </Grid>
        ))}
      </Grid>
    </ExpandablePanel>
  )
}

export default ScenarioPartsFields
