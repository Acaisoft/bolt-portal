import React from 'react'
import { AuthServiceName } from 'config/constants'
import { redirectToExternalLoginPage } from 'utils/router'

export function Login() {
  const authService = process.env.REACT_APP_AUTH_SERVICE

  if (authService === AuthServiceName.BOLT) {
    return redirectToExternalLoginPage(`${window.location.origin}/projects`)
  }

  return <div>Login Form</div>
}

export default Login
