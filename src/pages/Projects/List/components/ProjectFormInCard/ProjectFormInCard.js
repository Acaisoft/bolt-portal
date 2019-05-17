import React from 'react'
import PropTypes from 'prop-types'

import { Typography, withStyles } from '@material-ui/core'
import { Add, Edit, Close } from '@material-ui/icons'
import { Field } from 'react-final-form'
import { FileUploader, FormField } from '~containers'
import { ProjectForm } from '~containers/forms'

import { ButtonWithIcon, ImagePreview } from '~components'
import { CreateProject } from '~assets/icons'

import styles from './ProjectFormInCard.styles'

function ProjectFormInCard({
  classes,
  initialValues,
  mode,
  onCancel = () => {},
  onSubmit = () => {},
}) {
  return (
    <ProjectForm
      initialValues={initialValues}
      mode={mode}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      {({ form, fields }) => {
        return (
          <div className={classes.root}>
            <div className={classes.header}>
              <CreateProject className={classes.headerIcon} />
              <Typography variant="body1" className={classes.headerTitle}>
                {mode === 'create' ? 'New Project' : 'Update project data'}
              </Typography>
            </div>
            <form onSubmit={form.handleSubmit} className={classes.form}>
              <div className={classes.formFields}>
                <FormField
                  name="name"
                  field={fields.name}
                  margin="normal"
                  fullWidth
                />
                <FormField
                  name="description"
                  field={fields.description}
                  margin="normal"
                  fullWidth
                />

                <div>
                  <Field name="uploaded_image">
                    {({ input }) => (
                      <FileUploader
                        {...fields.uploaded_image.inputProps}
                        {...fields.uploaded_image.handlers(form, input)}
                      />
                    )}
                  </Field>
                </div>

                <div className={classes.imagePreviewContainer}>
                  <Field name="image_preview_url" subscription={{ value: true }}>
                    {({ input: { value } }) => (
                      <ImagePreview src={value} alt="Project logo preview" />
                    )}
                  </Field>
                </div>
              </div>

              <div className={classes.actionButtons}>
                <ButtonWithIcon
                  color="default"
                  icon={Close}
                  variant="contained"
                  disabled={form.submitting}
                  onClick={onCancel}
                >
                  Cancel
                </ButtonWithIcon>
                <ButtonWithIcon
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={form.pristine || !form.valid || form.submitting}
                  icon={mode === 'create' ? Add : Edit}
                >
                  {mode === 'create' ? 'Add' : 'Update'}
                </ButtonWithIcon>
              </div>
            </form>
          </div>
        )
      }}
    </ProjectForm>
  )
}
ProjectFormInCard.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  mode: PropTypes.oneOf(['create', 'edit']),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default withStyles(styles)(ProjectFormInCard)
