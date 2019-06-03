import KeycloakClient from 'keycloak-js'

export default class AuthKeycloak {
  constructor(config) {
    this.client = KeycloakClient(config)

    this.getToken = this.getToken.bind(this)
  }

  logInfo(...args) {
    console.info('[AuthKeycloak]', ...args)
  }

  logError(...args) {
    console.error('[AuthKeycloak]', ...args)
  }

  getToken() {
    return this.client.token
  }

  getIsAuthenticated() {
    return this.client.authenticated
  }

  getUser() {
    return new Promise((resolve, reject) => {
      if (this.client.profile) {
        return resolve({
          id: this.client.subject,
          ...this.client.profile,
        })
      }

      this.client
        .loadUserProfile()
        .success(profile => {
          this.logInfo('Profile loaded')
          resolve({
            id: this.client.subject,
            ...profile,
          })
        })
        .error(() => {
          this.logError('Profile loading failed')
          // reject()
        })
    })
  }

  init({ onLoad = 'login-required', ...options } = {}) {
    return new Promise((resolve, reject) => {
      this.client
        .init({ onLoad, ...options })
        .success(authenticated => {
          this.logInfo('Initialized successfully. Authenticated?', authenticated)
          resolve(authenticated)
        })
        .error(error => {
          this.logError('Initialization error', error)
          reject(error)
        })
    })
  }

  logout(options) {
    return new Promise((resolve, reject) => {
      this.client
        .logout(options)
        .success(result => {
          this.logInfo('Logout successful', result)
          resolve(result)
        })
        .error(error => {
          this.logError('Logout failed', error)
          reject(error)
        })
    })
  }

  login(options) {
    return new Promise((resolve, reject) => {
      this.client
        .login(options)
        .success(result => {
          this.logInfo('Login successful', result)
          resolve(result)
        })
        .error(error => {
          this.logError('Login failed', error)
          reject(error)
        })
    })
  }

  onTokenExpired(minValidity, onSuccess, onError) {
    this.client
      .updateToken(minValidity)
      .success(refreshed => {
        if (refreshed) {
          this.logInfo('Token was successfully refreshed')
        } else {
          this.logInfo('Token is still valid')
        }
        onSuccess(refreshed)
      })
      .error(error => {
        this.logError(
          'Failed to refresh the token, or the session has expired',
          error
        )
        onError(error)
      })
  }
}
