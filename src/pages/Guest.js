import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuth } from 'contexts/AuthContext'
import LoginPage from './Login'

export function Guest() {
  const { hasToken } = useAuth()

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      {!hasToken && <Route path="*" element={<Navigate to="login" replace />} />}
    </Routes>
  )
}

export default Guest
