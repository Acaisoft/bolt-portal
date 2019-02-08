import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { withStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

import FormField from '~components/FormField'
import { formFields, validationSchema, initialValues } from './formSchema'

import styles from './ProjectForm.styles'

export class ProjectForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    courseInitData: PropTypes.object,
  }

  handleSubmit = values => {
    console.log('submit:', values)
    this.props.close(null, false)
  }

  renderForm = ({ handleSubmit, isSubmitting, isValid }) => (
    <React.Fragment>
      <AppBar className={this.props.classes.appBar} position="static">
        <Typography variant="h3">
          {this.props.type === 'create' ? 'NEW PROJECT' : 'UPDATE PROJECT'}
        </Typography>
        <Typography variant="body1">
          {this.props.type === 'create'
            ? 'Add new project to your library'
            : `Update ${this.props.courseInitData.name} project data.`}
        </Typography>
      </AppBar>
      <form onSubmit={handleSubmit}>
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

        <Button
          color="primary"
          variant="text"
          disabled={isSubmitting}
          onClick={() => this.props.close(null, false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {this.props.type === 'create' ? 'ADD CONFIGURATION' : 'UPDATE'}
        </Button>
      </form>
    </React.Fragment>
  )

  render() {
    const { classes, open, courseInitData } = this.props
    return (
      <div>
        <Drawer
          open={open}
          anchor="right"
          classes={{
            paper: classes.drawer,
          }}
        >
          <Formik
            initialValues={courseInitData}
            onSubmit={values => this.handleSubmit(values)}
            validationSchema={validationSchema}
          >
            {this.renderForm}
          </Formik>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(ProjectForm)
