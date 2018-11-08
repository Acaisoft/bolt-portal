export class Config {
  constructor() {
    this.stage = process.env.REACT_APP_STAGE
    this.version = process.env.REACT_APP_VERSION
    this.env = process.env.NODE_ENV

    if (['stage', 'prod'].includes(this.stage)) {
      this.apiUrl = 'https://real-api.acaisoft.io/' // Deployed real API
    } else {
      this.apiUrl = 'http://localhost:443/' // Local real API
    }

    console.info('APP INFO', {
      stage: this.stage,
      version: `${this.env}-${this.version}`,
    })
  }
}

export default new Config()
