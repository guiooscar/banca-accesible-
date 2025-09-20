import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import SkipLink from './components/layout/SkipLink'
import Header from './components/layout/Header'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import DashboardView from './views/DashboardView'
import AccountsView from './views/AccountsView'
import TransfersView from './views/TransfersView'
import PaymentsView from './views/PaymentsView'
import SupportView from './views/SupportView'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Cargando usuario desde localStorage...')
    const savedUser = localStorage.getItem('authUser')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      console.log('Usuario cargado:', parsedUser)
      setUser(parsedUser)
      navigate('/')
    } else {
      console.log('No hay usuario en localStorage')
    }
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authUser')
    localStorage.removeItem('authToken')
    setUser(null)
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <SkipLink />
      
      {user && <Header user={user} onLogout={handleLogout} />}
      {user && <Navigation />}

      <main id="main-content" className="flex-grow-1 bg-light">
        <div className="container py-4">
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />

            {user ? (
              <>
                <Route path="/" element={<DashboardView user={user} />} />
                <Route path="/accounts" element={<AccountsView user={user} />} />
                <Route path="/transfers" element={<TransfersView user={user} />} />
                <Route path="/payments" element={<PaymentsView user={user} />} />
                <Route path="/support" element={<SupportView user={user} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
)

export default AppWrapper