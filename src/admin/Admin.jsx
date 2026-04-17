import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function Admin() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')
    if (savedToken) setToken(savedToken)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
  }

  if (!token) {
    return <AdminLogin onLogin={setToken} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
