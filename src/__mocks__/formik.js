import { makeGetProxy } from '~utils/proxies'
const original = require.requireActual('formik')

// Custom mocks
const definedMocks = {
  getIn: original.getIn,
}

// Mock any not defined components automatically: Component -> ComponentMock
module.exports = makeGetProxy(definedMocks, (target, name) => `${name}Mock`)
