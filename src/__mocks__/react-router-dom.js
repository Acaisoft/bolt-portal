import { makeGetProxy } from '~utils/proxies'
const original = require.requireActual('react-router-dom')

// Custom mocks
const definedMocks = {
  withRouter: jest.fn(() => 'withRouterMock'),
  generatePath: original.generatePath,
}

// Mock any not defined components automatically: Component -> ComponentMock
module.exports = makeGetProxy(definedMocks, (target, name) => `${name}Mock`)
