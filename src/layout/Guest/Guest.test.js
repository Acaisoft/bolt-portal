import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Guest } from './Guest'

jest.unmock('@material-ui/core')

jest.mock('~pages/Guest', () => () => <div>test guest pages</div>)

describe('layout: Guest', () => {
  afterEach(cleanup)

  describe('rendering', () => {
    test('render without crashing', () => {
      const { getByText } = render(<Guest />)

      expect(getByText('test guest pages')).toBeVisible()
    })
  })
})
