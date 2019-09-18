export class Config {
  constructor() {
    this.stage = process.env.REACT_APP_STAGE || ''
    this.version = process.env.REACT_APP_VERSION
    this.env = process.env.NODE_ENV
    // Include all possible keys for better IntelliSense in IDEs
    this.keycloak = {
      url: null,
      realm: 'Bolt',
      clientId: 'bolt-portal',
    }
    this.hasura = {
      wsUri: null,
      apiUri: null,
      accessKey: null,
      userID: null,
    }

    switch (this.stage.toLowerCase()) {
      case 'prod':
        this.hasura = {
          ...this.hasura,
          wsUri: 'wss://hasura.bolt.acaisoft.io/v1alpha1/graphql',
          apiUri: 'https://hasura.bolt.acaisoft.io/v1alpha1/graphql',
          accessKey: '26ec3dc5f542a792890f',
          userID: '7f1aab7a-e941-46a2-b63a-5b28b80ad384',
        }
        this.keycloak = {
          ...this.keycloak,
          url: 'https://keycloak.bolt.acaisoft.io/auth',
        }
        break
      case 'stage':
        this.hasura = {
          ...this.hasura,
          wsUri: 'wss://www.hasura.dev.bolt.acaisoft.io/v1alpha1/graphql',
          apiUri: 'https://www.hasura.dev.bolt.acaisoft.io/v1alpha1/graphql',
          accessKey: '26ec3dc5f542a792890f',
          userID: 'aaaaaaaa-ef65-4556-a1a5-96ff1f0068cb',
        }
        this.keycloak = {
          ...this.keycloak,
          url: 'https://keycloak.dev.bolt.acaisoft.io/auth',
        }
        break
      case 'dev-lite':
        this.hasura = {
          ...this.hasura,
          wsUri: 'wss://hasura.dev-lite.bolt.acaisoft.io/v1alpha1/graphql',
          apiUri: 'https://hasura.dev-lite.bolt.acaisoft.io/v1alpha1/graphql',
          accessKey: '26ec3dc5f542a792890f',
          userID: '7f1aab7a-e941-46a2-b63a-5b28b80ad384',
        }
        this.keycloak = {
          ...this.keycloak,
          url: 'https://keycloak.dev.bolt.acaisoft.io/auth',
        }
        break
      default:
        this.hasura = {
          ...this.hasura,
          wsUri: 'ws://localhost:8080/v1alpha1/graphql',
          apiUri: 'http://localhost:8080/v1alpha1/graphql',
          accessKey: 'devaccess',
          userID: 'aaaaaaaa-ef65-4556-a1a5-96ff1f0068cb',
        }
        this.keycloak = {
          ...this.keycloak,
          url: 'https://keycloak.dev.bolt.acaisoft.io/auth',
        }
    }

    console.info('APP INFO', {
      stage: this.stage,
      version: `${this.env}-${this.version}`,
    })
  }
}

export default new Config()
