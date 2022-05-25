import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'
import { Add, Edit, Close } from '@material-ui/icons'
import { FormField } from 'containers'
import { ProjectForm } from 'containers/forms'

import { Button } from 'components'
import { CreateProject } from 'assets/icons'

import useStyles from './ProjectFormInCard.styles'

function ProjectFormInCard({
  initialValues,
  mode,
  onCancel = () => {},
  onSubmit = () => {},
}) {
  const classes = useStyles()

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
                  id="name"
                  name="name"
                  field={fields.name}
                  margin="normal"
                  fullWidth
                />
                <FormField
                  id="description"
                  name="description"
                  field={fields.description}
                  margin="normal"
                  fullWidth
                />

                {/* TODO: uncomment when upload will be needed*/}
                {/*<div>*/}
                {/*  <Field name="uploaded_image">*/}
                {/*    {({ input }) => (*/}
                {/*      <FileUploader*/}
                {/*        {...fields.uploaded_image.inputProps}*/}
                {/*        {...fields.uploaded_image.handlers(form, input)}*/}
                {/*      />*/}
                {/*    )}*/}
                {/*  </Field>*/}
                {/*</div>*/}
                {/*<div className={classes.imagePreviewContainer}>*/}
                {/*  <Field name="image_preview_url" subscription={{ value: true }}>*/}
                {/*    {({ input: { value } }) => (*/}
                {/*      <ImagePreview src={value} alt="Project logo preview" />*/}
                {/*    )}*/}
                {/*  </Field>*/}
                {/*</div>*/}
              </div>

              <div className={classes.actionButtons}>
                <Button
                  className={classes.cancelButton}
                  color="default"
                  icon={Close}
                  variant="contained"
                  disabled={form.submitting}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={form.pristine || !form.valid || form.submitting}
                  icon={mode === 'create' ? Add : Edit}
                >
                  {mode === 'create' ? 'Add' : 'Update'}
                </Button>
              </div>
            </form>
          </div>
        )
      }}
    </ProjectForm>
  )
}
ProjectFormInCard.propTypes = {
  initialValues: PropTypes.object,
  mode: PropTypes.oneOf(['create', 'edit']),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default ProjectFormInCard
