import { screen } from '@testing-library/react'

export function getByRoleAndName(role, name, options) {
  return screen.getByRole(role, {
    name: new RegExp(name, 'i'),
    ...options,
  })
}
