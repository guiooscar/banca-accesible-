import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'

const RegisterView = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Debe tener al menos 3 caracteres'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setSuccess(false)

    try {
      const userData = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        password: formData.password
      }

      await authService.register(userData)
      setSuccess(true)

      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (err) {
      setErrors({ submit: err.message || 'Error al registrar. Intente nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Skip Link */}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h1 className="h3 fw-bold text-dark">Crear Cuenta</h1>
                  <p className="text-muted small">Regístrese para acceder a su banca en línea</p>
                </div>

                {success && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert" aria-live="assertive">
                    <strong>¡Registro exitoso!</strong> Será redirigido al login en unos segundos.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
                  </div>
                )}

                {errors.submit && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert" aria-live="assertive">
                    {errors.submit}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4" noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-dark">Nombre Completo</label>
                    <input
                      id="name"
                      type="text"
                      className={`form-control form-control-lg border ${errors.name ? 'border-danger' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <div id="name-error" className="text-danger small mt-1">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-dark">Nombre de Usuario</label>
                    <input
                      id="username"
                      type="text"
                      className={`form-control form-control-lg border ${errors.username ? 'border-danger' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      aria-describedby={errors.username ? "username-error" : undefined}
                    />
                    {errors.username && <div id="username-error" className="text-danger small mt-1">{errors.username}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark">Contraseña</label>
                    <div className="input-group">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`form-control form-control-lg border ${errors.password ? 'border-danger' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        aria-describedby={errors.password ? "password-error" : undefined}
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
                    <div className="form-text text-muted small">Debe tener al menos 6 caracteres.</div>
                    {errors.password && <div id="password-error" className="text-danger small mt-1">{errors.password}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label text-dark">Confirmar Contraseña</label>
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className={`form-control form-control-lg border ${errors.confirmPassword ? 'border-danger' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                      aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                    />
                    {errors.confirmPassword && <div id="confirm-error" className="text-danger small mt-1">{errors.confirmPassword}</div>}
                  </div>

                  <button
                    type="submit"
                    className="w-100 btn btn-primary btn-lg py-3 rounded-3 fw-bold text-white shadow-sm"
                    disabled={isLoading}
                    aria-label="Registrar nuevo usuario"
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    Registrarse
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted small">
                    ¿Ya tiene una cuenta?{' '}
                    <a href="/login" className="text-decoration-none text-primary">
                      Inicie sesión aquí
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white border-top border-gray-200 px-5 py-3 text-center">
                <p className="text-muted small mb-0">
                  © 2025 Banca en Línea. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterView