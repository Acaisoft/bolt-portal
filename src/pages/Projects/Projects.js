import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TestConfigurationsPage from 'pages/TestConfigurations'
import TestExecutionsPage from 'pages/TestExecutions'
import TestSourcesPage from 'pages/TestSources'
import TestsCompare from 'pages/TestsCompare'
import ListPage from './List'
// import DetailsPage from './Details'

export function Projects() {
  return (
    <Routes>
      <Route index element={<ListPage />} />
      <Route path=":projectId/*" element={<ProjectSubpages />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function ProjectSubpages() {
  return (
    <Routes>
      {/* <Route exact path="/" element={DetailsPage} /> */}
      <Route path="runs/*" element={<TestExecutionsPage />} />
      <Route path="sources/*" element={<TestSourcesPage />} />
      <Route path="configs/*" element={<TestConfigurationsPage />} />
      <Route
        path="compare/:compareIdFirst/to/:compareIdSecond"
        element={<TestsCompare />}
      />
      <Route path="*" element={<Navigate to="configs" replace />} />
    </Routes>
  )
}

export default Projects
