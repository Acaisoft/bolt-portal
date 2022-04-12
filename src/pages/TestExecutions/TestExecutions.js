import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import ListPage from './List'
import DetailsPage from './Details'
import EndpointDetailsPage from './EndpointDetails'
import MonitoringPage from './Monitoring'

export function TestExecutions() {
  return (
    <Routes>
      <Route index element={<ListPage />} />
      <Route path=":executionId" element={<DetailsPage />} />
      <Route
        path=":executionId/endpoint/:endpointId"
        element={<EndpointDetailsPage />}
      />
      <Route path=":executionId/monitoring" element={<MonitoringPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default TestExecutions
