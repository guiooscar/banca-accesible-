import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'

const LoginView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const cleanUsername = username.trim()
    const cleanPassword = password.trim()

    console.log('Intentando login con:', { cleanUsername, cleanPassword })

    try {
      const user = await authService.login(cleanUsername, cleanPassword)
      console.log('Respuesta del servicio:', user)

      if (user) {
        localStorage.setItem('authUser', JSON.stringify(user))
        localStorage.setItem('authToken', 'fake-jwt-token-' + user.id)
        console.log('Usuario guardado en localStorage:', user)
        navigate('/')
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    } catch (err) {
      console.error('Error en login:', err)
      setError('Error al iniciar sesión')
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <a
        href="#main-content"
        className="skip-link position-absolute top-0 start-50 translate-middle-x p-2 bg-white text-blue-700 rounded shadow-sm text-decoration-none fw-bold"
        aria-label="Saltar al contenido principal"
      >
        Saltar al contenido principal
      </a>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div
              className="card shadow-xl border-0 rounded-4 overflow-hidden"
              role="main"
              id="main-content"
            >
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="bg-white rounded-full d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                    <svg className="text-blue-600" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="h3 fw-bold text-dark">Banca en Línea</h2>
                  <p className="text-muted small">Acceda de forma segura a sus cuentas</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert" aria-live="assertive">
                    <strong>Error:</strong> {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-dark">Nombre de usuario o email</label>
                    <input
                      id="username"
                      type="text"
                      className="form-control form-control-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="username"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark">Contraseña</label>
                    <div className="input-group">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-me"
                        aria-label="Recordar mis credenciales"
                      />
                      <label className="form-check-label text-dark" htmlFor="remember-me">
                        Recordar mis credenciales
                      </label>
                    </div>
                    <a href="#" className="text-decoration-none text-primary small">
                      ¿Olvidó su contraseña?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-100 btn btn-primary btn-lg py-3 rounded-3 fw-bold text-white shadow-sm"
                    aria-label="Iniciar sesión en la banca en línea"
                  >
                    Iniciar Sesión
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted small">
                    ¿No tiene una cuenta?{' '}
                    <a href="/register" className="text-decoration-none text-primary">
                      Regístrese ahora
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white border-top border-gray-200 px-5 py-3 text-center">
                <p className="text-muted small mb-0">
                  © 2024 Banca en Línea. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginView