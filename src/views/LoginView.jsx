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

    try {
      const user = await authService.login(cleanUsername, cleanPassword)
      console.log('Usuario recibido:', user) // Debug

      if (user) {
        localStorage.setItem('authUser', JSON.stringify(user))
        localStorage.setItem('authToken', 'fake-jwt-token-' + user.id)
        console.log('Guardado en localStorage:', user) // Debug
        navigate('/', { replace: true }) // ← Fuerza redirección
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    } catch (err) {
      console.error('Error en login:', err)
      setError('Error al iniciar sesión')
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary bg-gradient">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="card shadow-lg rounded-4" role="main">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <img
              src="/logo-banco.png"
              alt="Logo del banco"
              className="img-fluid rounded-circle"
              style={{ width: '64px', height: '64px' }}
/>
              <h2 className="h3 fw-bold">Banca en Línea</h2>
              <p className="text-muted">Acceda de forma segura a sus cuentas</p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert" aria-live="assertive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Nombre de usuario o email</label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="username"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-required="true"
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
                    id="remember"
                    aria-label="Recordar mis credenciales"
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Recordar mis credenciales
                  </label>
                </div>
                <a href="#" className="text-decoration-none small">¿Olvidó su contraseña?</a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 rounded-3 fw-bold"
                aria-label="Iniciar sesión en la banca en línea"
              >
                Iniciar Sesión
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted small">
                ¿No tiene una cuenta?{' '}
                <a href="/register" className="text-decoration-none">
                  Regístrese ahora
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-white small">
            © 2025 Banca en Línea. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginView