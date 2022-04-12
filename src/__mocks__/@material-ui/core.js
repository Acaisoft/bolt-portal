import { ClassesProxy } from 'utils/tests/mocks'
import { makeGetProxy } from 'utils/proxies'

// Custom mocks
const definedMocks = {
  createTheme: jest.fn(),
  withStyles: jest.fn(() => jest.fn(component => component)),
  makeStyles: jest.fn(() => jest.fn(() => ClassesProxy)),
}

// Mock any not defined components automatically: Component -> ComponentMock
module.exports = makeGetProxy(definedMocks, (target, name) => `${name}Mock`)
