import React from 'react'
import { shallow } from 'enzyme'

export default wrapper => shallow(<div>{wrapper.prop('children')}</div>).text()
