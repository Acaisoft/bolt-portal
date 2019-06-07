import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { SectionPlaceholder } from './SectionPlaceholder'

jest.unmock('@material-ui/core')
jest.unmock('@material-ui/icons')

let title, description, actions, topImage, icon

describe('component: SectionPlaceholder', () => {
  afterEach(cleanup)

  describe('rendering', () => {
    beforeEach(() => {
      actions = <div data-testid="fake-actions" />
      title = 'Test title'
      description = 'Test description'
      topImage = <div data-testid="fake-top-image" />
      icon = <div data-testid="fake-icon" />
    })

    test('render description', () => {
      const { getByText } = render(
        <SectionPlaceholder title={title} description={description} />
      )
      const descriptionEl = getByText(description)

      expect(descriptionEl).toBeVisible()
    })

    test('render provided actions', () => {
      const { getByTestId } = render(
        <SectionPlaceholder title={title} actions={actions} />
      )
      expect(getByTestId('fake-actions')).toBeVisible()
    })

    test('render provided icon', () => {
      const { getByTestId } = render(
        <SectionPlaceholder title={title} icon={icon} />
      )
      expect(getByTestId('fake-icon')).toBeVisible()
    })

    test('render provided top image', () => {
      const { getByTestId } = render(
        <SectionPlaceholder title={title} topImage={topImage} />
      )
      expect(getByTestId('fake-top-image')).toBeVisible()
    })

    describe("set the container's height", () => {
      test.each([
        [undefined, '100%'], // default
        ['20vh', '20vh'],
        [100, 100],
      ])('when height is %s, should set to %s', (height, expected) => {
        const { getByTestId } = render(
          <SectionPlaceholder title={title} height={height} />
        )

        const container = getByTestId('placeholder-root')
        expect(container).toHaveStyle(`height: ${expected}`)
      })
    })
  })
})
