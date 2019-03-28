import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Formik, Field } from 'formik'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'
import { withStyles, Typography } from '@material-ui/core'
import { Add, Close, Edit } from '@material-ui/icons'
import { ButtonWithIcon, FormField, ImagePreview } from '~components'
import { FileUploader } from '~containers'
import { CreateProject } from '~assets/icons'

import { formFields, validationSchema } from './formSchema'
import styles from './ProjectForm.styles'

import {
  ADD_PROJECT_MUTATION,
  EDIT_PROJECT_MUTATION,
} from '~services/GraphQL/Mutations'
import { GET_PROJECTS_QUERY } from '~services/GraphQL/Queries'

export class ProjectForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    mode: PropTypes.oneOf(['create', 'edit']),
  }

  static defaultProps = {
    mode: 'create',
    onCancel: () => {},
    onSubmit: () => {},
  }

  handleSubmit = async (values, { projectMutation, setSubmitting }) => {
    const { id, name, description, image_url } = values

    try {
      await projectMutation({
        variables: {
          id: this.props.mode === 'create' ? undefined : id,
          name,
          description,
          image_url,
        },
      })
      this.props.onSubmit(values)
    } catch (err) {
      toast.error(err.message)
    }

    setSubmitting(false)
  }

  handleFileUploadStart = ({ setSubmitting }) => {
    setSubmitting(true)
  }

  handleFileLoad = (fileAsDataUrl, { setFieldValue }) => {
    console.log('handleFileLoad', fileAsDataUrl)
    setFieldValue('image_preview_url', fileAsDataUrl)
  }

  handleFileUploadSuccess = (uploadInfoData, { setFieldValue, setSubmitting }) => {
    console.log('file upload success', uploadInfoData)
    setSubmitting(false)
    setFieldValue('image_url', uploadInfoData.download_url)
  }

  handleFileUploadError = (err, { setFieldValue, setSubmitting }) => {
    console.log('file upload error', err)
    setFieldValue('image_url', null)
    setSubmitting(false)
  }

  render() {
    const { classes, className, initialValues, mode } = this.props

    return (
      <Mutation
        mutation={mode === 'create' ? ADD_PROJECT_MUTATION : EDIT_PROJECT_MUTATION}
        refetchQueries={[{ query: GET_PROJECTS_QUERY }]}
      >
        {(projectMutation, { data }) => (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikActions) =>
              this.handleSubmit(values, { projectMutation, ...formikActions })
            }
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting, dirty, ...formikBag }) => {
              return (
                <div className={classNames(classes.root, className)}>
                  <div className={classes.header}>
                    <CreateProject className={classes.headerIcon} />
                    <Typography variant="body1" className={classes.headerTitle}>
                      {mode === 'create' ? 'New Project' : 'Update project data'}
                    </Typography>
                  </div>
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.formFields}>
                      {Object.entries(formFields).map(([name, options]) => {
                        return (
                          <FormField
                            key={name}
                            name={name}
                            label={options.label}
                            margin="normal"
                            fullWidth
                            {...options.input}
                          />
                        )
                      })}

                      <div>
                        <FileUploader
                          label="Upload Image"
                          id="project_image"
                          onStart={() => this.handleFileUploadStart(formikBag)}
                          onSuccess={info =>
                            this.handleFileUploadSuccess(info, formikBag)
                          }
                          onError={err => this.handleFileUploadError(err, formikBag)}
                          onLoad={fileAsDataUrl =>
                            this.handleFileLoad(fileAsDataUrl, formikBag)
                          }
                        />
                      </div>

                      <div className={classes.imagePreviewContainer}>
                        <Field name="image_preview_url">
                          {({ field: { value } }) => (
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
                        disabled={isSubmitting}
                        onClick={() => this.props.onCancel()}
                      >
                        Cancel
                      </ButtonWithIcon>
                      <ButtonWithIcon
                        color="secondary"
                        variant="contained"
                        type="submit"
                        disabled={!dirty || isSubmitting}
                        icon={mode === 'create' ? Add : Edit}
                      >
                        {mode === 'create' ? 'Add' : 'Update'}
                      </ButtonWithIcon>
                    </div>
                  </form>
                </div>
              )
            }}
          </Formik>
        )}
      </Mutation>
    )
  }
}

export default withStyles(styles)(ProjectForm)
