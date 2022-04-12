import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import { Authorized } from './Authorized'

jest.unmock('@material-ui/core')

describe('page: Authorized', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      render(
        <MockedProvider mocks={[]}>
          <MemoryRouter>
            <Authorized />
          </MemoryRouter>
        </MockedProvider>
      )
      expect(screen.getByText('Loading projects...'))
    })
  })
})
