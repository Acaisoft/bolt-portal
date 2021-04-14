export class Config {
  constructor() {
    this.stage = process.env.REACT_APP_STAGE || ''
    this.version = process.env.REACT_APP_VERSION
    this.env = process.env.NODE_ENV
    // Include all possible keys for better IntelliSense in IDEs
    this.keycloak = {
      url: process.env.REACT_APP_KEYCLOAK_URL || 'https://localhost:7000/auth',
      realm: 'Bolt',
      clientId: 'bolt-portal',
    }
    this.hasura = {
      wsUri: process.env.REACT_APP_HASURA_WS_URL || 'ws://localhost:8080/v1alpha1/graphql',
      apiUri: process.env.REACT_APP_HASURA_API_URL || 'http://localhost:8080/v1alpha1/graphql',
    }

    // switch (this.stage.toLowerCase()) {
    //   case 'prod':
    //     this.hasura = {
    //       ...this.hasura,
    //       wsUri: 'wss://hasura.bolt.acaisoft.io/v1alpha1/graphql',
    //       apiUri: 'https://hasura.bolt.acaisoft.io/v1alpha1/graphql',
    //     }
    //     this.keycloak = {
    //       ...this.keycloak,
    //       url: 'https://keycloak.bolt.acaisoft.io/auth',
    //     }
    //     break
    //   case 'stage':
    //     this.hasura = {
    //       ...this.hasura,
    //       wsUri: 'wss://www.hasura.dev.bolt.acaisoft.io/v1alpha1/graphql',
    //       apiUri: 'https://www.hasura.dev.bolt.acaisoft.io/v1alpha1/graphql',
    //     }
    //     this.keycloak = {
    //       ...this.keycloak,
    //       url: 'https://keycloak.dev.bolt.acaisoft.io/auth',
    //     }
    //     break
    //   case 'dev-lite':
    //     this.hasura = {
    //       ...this.hasura,
    //       wsUri: 'wss://hasura.dev-lite.bolt.acaisoft.io/v1alpha1/graphql',
    //       apiUri: 'https://hasura.dev-lite.bolt.acaisoft.io/v1alpha1/graphql',
    //     }
    //     this.keycloak = {
    //       ...this.keycloak,
    //       url: 'https://keycloak.dev.bolt.acaisoft.io/auth',
    //     }
    //     break
    //   default:
    //     this.hasura = {
    //       ...this.hasura,
    //       wsUri: 'ws://localhost:8080/v1alpha1/graphql',
    //       apiUri: 'http://localhost:8080/v1alpha1/graphql',
    //     }
    //     this.keycloak = {
    //       ...this.keycloak,
    //       url: 'https://keycloak.dev.bolt.acaisoft.io/auth',
    //     }
    // }

    console.info('APP INFO', {
      stage: this.stage,
      version: `${this.env}-${this.version}`,
      env: process.env,
    })
  }
}

export default new Config()
