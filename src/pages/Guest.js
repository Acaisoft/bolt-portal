import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from './Login'

export function Guest() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  )
}

export default Guest
