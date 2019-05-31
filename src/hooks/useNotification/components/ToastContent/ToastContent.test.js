import React from 'react'
import { render, cleanup } from 'react-testing-library'

import { ClassesProxy } from '~utils/tests/mocks'
import { ToastContent } from './ToastContent'

jest.unmock('@material-ui/core')

let IconComponent, title, message

describe('component: ToastContent', () => {
  afterEach(cleanup)

  describe('rendering', () => {
    beforeEach(() => {
      IconComponent = props => <div id="mockedIcon" {...props} />
      title = 'Test title'
      message = 'Test message'
    })

    test('render icon', () => {
      const { getByTestId } = render(
        <ToastContent
          classes={ClassesProxy}
          title={title}
          message={message}
          IconComponent={IconComponent}
        />
      )
      const iconEl = getByTestId('toast-content-icon-component')

      expect(iconEl).toBeVisible()
    })

    test('render title', () => {
      const { getByText } = render(
        <ToastContent classes={ClassesProxy} title={title} message={message} />
      )
      const titleEl = getByText('Test title')

      expect(titleEl).toBeVisible()
    })

    test('render message', () => {
      const { getByText } = render(
        <ToastContent classes={ClassesProxy} title={title} message={message} />
      )
      const messageEl = getByText('Test message')

      expect(messageEl).toBeVisible()
    })
  })
})
