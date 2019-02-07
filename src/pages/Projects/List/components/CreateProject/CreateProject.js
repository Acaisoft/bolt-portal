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

import styles from './CreateProject.styles'

export class CreateProject extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  }

  handleSubmit = values => {
    console.log('submit:', values)
    this.props.close()
  }

  renderForm = ({ handleSubmit, isSubmitting, isValid }) => (
    <React.Fragment>
      <AppBar className={this.props.classes.appBar} position="static">
        <Typography variant="h3">NEW PROJECT</Typography>
        <Typography variant="body1">Here you can define your new project</Typography>
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
          onClick={this.props.close}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Add Configuration
        </Button>
      </form>
    </React.Fragment>
  )

  render() {
    const { classes, open } = this.props

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
            initialValues={initialValues}
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

export default withStyles(styles)(CreateProject)
