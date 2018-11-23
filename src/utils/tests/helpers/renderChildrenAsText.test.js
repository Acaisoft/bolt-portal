import React from 'react'

import { shallow } from 'enzyme'

import renderChildrenAsText from './renderChildrenAsText'

describe('utils/tests/helpers: renderChildrenAsText', () => {
  it("should render all childrens' text", () => {
    const fakeComponents = shallow(
      <div>
        <span>one</span>
        <p>two</p>
      </div>
    )
    const renderedText = renderChildrenAsText(fakeComponents)

    expect(renderedText).toBe('onetwo')
  })
})
