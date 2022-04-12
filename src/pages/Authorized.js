import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import ProjectsPage from './Projects'

export function Authorized() {
  return (
    <Routes>
      <Route path="projects/*" element={<ProjectsPage />} />
      <Route path="*" element={<Navigate to="projects" replace />} />
    </Routes>
  )
}

export default Authorized
