import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import TestExecutionsPage from 'pages/TestExecutions'
import ListPage from './List'
import DetailsPage from './Details'
import CreateOrEditPage from './CreateOrEdit'

export function TestConfigurations() {
  return (
    <Routes>
      <Route index element={<ListPage />} />
      <Route path="create" element={<CreateOrEditPage />} />
      <Route path=":configurationId/*" element={<ConfigurationSubpages />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function ConfigurationSubpages() {
  return (
    <Routes>
      <Route index element={<DetailsPage />} />
      <Route path="edit" element={<CreateOrEditPage />} />
      <Route path="runs/*" element={<TestExecutionsPage />} />
    </Routes>
  )
}

export default TestConfigurations
