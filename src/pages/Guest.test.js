import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { AuthProvider } from 'contexts/AuthContext'
import { Guest } from './Guest'

jest.unmock('@material-ui/core')

describe('page: Guest', () => {
  beforeAll(() => {
    delete window.location
    window.location = { reload: jest.fn() }
  })

  describe('rendering', () => {
    it('should render without crashing', () => {
      render(
        <AuthProvider>
          <MemoryRouter>
            <Guest />
          </MemoryRouter>
        </AuthProvider>
      )
      expect(screen.getByText('Login Form')).toBeInTheDocument()
    })
  })
})
