import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { useForm } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { composeValidators, requireWhenOtherIsSet, uniqueInArray } from 'utils/forms'
import { FormField } from 'containers'
import { Button, ExpandablePanel } from 'components'

function EnvVariablesFields() {
  const { mutators } = useForm()

  return (
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
                    onClick={() => mutators.remove('configuration_envvars', index)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                onClick={() => mutators.push('configuration_envvars', undefined)}
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
  )
}

export default EnvVariablesFields
