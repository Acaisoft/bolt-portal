export class Config {
  constructor() {
    this.stage = process.env.REACT_APP_STAGE || ''
    this.version = process.env.REACT_APP_VERSION
    this.env = process.env.NODE_ENV
    this.https = true

    switch (this.stage.toLowerCase()) {
      case 'prod':
        this.apiBase = 'hasura.bolt.acaisoft.io'
        this.hasuraAccessKey = '26ec3dc5f542a792890f'
        this.hasuraUserID = '7f1aab7a-e941-46a2-b63a-5b28b80ad384'
        break
      case 'stage':
        this.apiBase = 'hasura.dev.bolt.acaisoft.io'
        this.hasuraAccessKey = 'FF662305FF444E1CB81BB1D7DD310BC0'
        this.hasuraUserID = 'aaaaaaaa-ef65-4556-a1a5-96ff1f0068cb'
        break
      default:
        this.apiBase = 'localhost:8080'
        this.secure = false
        this.hasuraAccessKey = 'devaccess'
        this.hasuraUserID = 'aaaaaaaa-ef65-4556-a1a5-96ff1f0068cb'
    }

    console.info('APP INFO', {
      stage: this.stage,
      version: `${this.env}-${this.version}`,
    })
  }
}

export default new Config()
