import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, getByTestId, act, fireEvent } from '@testing-library/react'

import { Button } from './Button'

jest.unmock('@material-ui/core')

let label

describe('component: Button', () => {
  afterEach(cleanup)

  beforeEach(() => {
    label = 'My button'
  })

  describe('rendering', () => {
    test('button text', () => {
      const { getByText } = render(<Button>{label}</Button>)

      const button = getByText(label)
      expect(button).toBeVisible()
    })

    test('icon', () => {
      const icon = () => <span data-testid="fake-icon" />
      const { getByText } = render(<Button icon={icon}>{label}</Button>)

      const button = getByText(label)
      expect(getByTestId(button, 'fake-icon')).toBeVisible()
    })

    test('as <button /> by default', () => {
      const { getByRole } = render(<Button>{label}</Button>)

      const button = getByRole('button')
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveAttribute('type', 'button')
    })

    test('as <a /> when href passed', () => {
      const href = '/some/url'
      const { getByRole } = render(
        <MemoryRouter>
          <Button href={href}>{label}</Button>
        </MemoryRouter>
      )

      const button = getByRole('button')
      expect(button.tagName).toBe('A')
      expect(button).toHaveAttribute('href', href)
    })

    test('link variant', () => {
      const { getByRole } = render(
        <Button variant="link" classes={{ link: 'fake-link-class' }}>
          {label}
        </Button>
      )

      const button = getByRole('button')
      expect(button).toHaveClass('fake-link-class')
    })
  })

  describe('events', () => {
    test('onClick', () => {
      const onClick = jest.fn()
      const { getByText } = render(<Button onClick={onClick}>{label}</Button>)

      const button = getByText(label)
      act(() => {
        fireEvent.click(button)
      })

      expect(onClick).toHaveBeenCalled()
    })
  })
})
