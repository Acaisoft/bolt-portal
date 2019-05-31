import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

function MockedRouter({ children, initialRoute = '/' }) {
  const history = createMemoryHistory({ initialEntries: [initialRoute] })
  return <Router history={history}>{children}</Router>
}

export default MockedRouter
