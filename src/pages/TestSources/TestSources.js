import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import CreateOrEditPage from './CreateOrEdit'
import DetailsPage from './Details'
import ListPage from './List'

export function TestSources() {
  return (
    <Routes>
      <Route index element={<ListPage />} />
      <Route path="create" element={<CreateOrEditPage />} />
      <Route path=":sourceId/*" element={<SourceSubpages />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function SourceSubpages() {
  return (
    <Routes>
      <Route index element={<DetailsPage />} />
      <Route path="edit" element={<CreateOrEditPage />} />
    </Routes>
  )
}

export default TestSources
