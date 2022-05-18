import { screen } from '@testing-library/react'

export function getByRoleAndName(role, name, { noRegex, ...rest } = {}) {
  return screen.getByRole(role, {
    name: noRegex ? name : new RegExp(name, 'i'),
    ...rest,
  })
}
