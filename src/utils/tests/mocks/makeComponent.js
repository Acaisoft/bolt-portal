export const makeNamedComponent = displayName => {
  const Component = ({ children }) => children
  Component.displayName = displayName
  return Component
}

export const makeUnnamedComponent = () => {
  const Component = () => {}
  Object.defineProperty(Component, 'name', { writable: true })
  Component.name = ''
  Component.displayName = ''
  return Component
}
