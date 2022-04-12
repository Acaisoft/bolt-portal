import React from 'react'
import { render, screen } from '@testing-library/react'

import { Login } from './Login'

jest.unmock('@material-ui/core')

describe('page: Login', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      render(<Login />)
      expect(screen.getByText('Login Form')).toBeInTheDocument()
    })
  })
})
