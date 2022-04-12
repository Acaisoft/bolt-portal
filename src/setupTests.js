import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'
import '@testing-library/jest-dom/extend-expect'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Don't display console.info at all
console.info = () => {}
