import React, { Component } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import LoginPage from './Login'

export class Guest extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Redirect from="*" to="/login" />
      </Switch>
    )
  }
}

export default Guest
