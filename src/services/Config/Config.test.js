import { Config } from './Config'

describe('service: Config', () => {
  describe('constructor', () => {
    it('should contain all required keys', () => {
      const config = new Config()
      expect(Object.keys(config)).toEqual(
        expect.arrayContaining(['apiBase', 'env', 'stage', 'version'])
      )
    })

    describe('getting apiBase', () => {
      describe('should return correct apiBase for any APP_STAGE', () => {
        it('should return dev apiBase if stage is "stage"', () => {
          process.env.REACT_APP_STAGE = 'stage'
          const config = new Config()
          expect(config.apiBase).toContain('hasura.dev.bolt')
        })

        it('should return prod apiBase if stage is "prod"', () => {
          process.env.REACT_APP_STAGE = 'prod'
          const config = new Config()
          expect(config.apiBase).toContain('hasura.bolt')
        })

        it('should return local api url if stage is not "stage" or "prod"', () => {
          const stages = ['local', 'nosense']
          for (const stage of stages) {
            process.env.REACT_APP_STAGE = stage
            const config = new Config()
            expect(config.apiBase).toContain('localhost')
          }
        })
      })
    })

    describe('getting stage', () => {
      it('should read stage from env', () => {
        process.env.REACT_APP_STAGE = 'some stage'
        const config = new Config()
        expect(config.stage).toBe('some stage')
      })
    })

    describe('getting version', () => {
      it('should read version from env', () => {
        process.env.REACT_APP_VERSION = 'some version'
        const config = new Config()
        expect(config.version).toBe('some version')
      })
    })

    describe('getting env', () => {
      it('should read env from env', () => {
        const config = new Config()
        expect(config.env).toBe('test')
      })
    })
  })
})
