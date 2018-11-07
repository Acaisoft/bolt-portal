import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Fail tests on any error
// eslint-disable-next-line
console.error = message => {
  throw new Error(message)
}

// Don't display console.info at all
console.info = () => {}
