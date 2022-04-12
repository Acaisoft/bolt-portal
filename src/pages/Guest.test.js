import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { Guest } from './Guest'

jest.unmock('@material-ui/core')

describe('page: Guest', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      render(<Guest />, { wrapper: MemoryRouter })
      expect(screen.getByText('Login Form')).toBeInTheDocument()
    })
  })
})
