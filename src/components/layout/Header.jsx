import React from 'react'

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-bottom" role="banner">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <div className="bg-primary rounded p-2">
                <svg className="text-white" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="ms-3 h4 mb-0 fw-bold text-dark">Banca en Línea</h1>
          </div>

          {user && (
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-link text-muted p-2"
                aria-label="Notificaciones"
                title="Notificaciones"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 17h5l-5 5v-5zM10.5 3.5L7 7v10l3.5 3.5M14 7v10l3.5 3.5L21 17V7l-3.5-3.5L14 7z" />
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">Nuevas notificaciones</span>
                </span>
              </button>

              <div className="dropdown">
                <button
                  className="btn btn-link text-dark text-decoration-none dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Menú de usuario"
                >
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-md-block">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><button className="dropdown-item" onClick={() => console.log('Perfil')}>Perfil</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={onLogout}>Cerrar sesión</button></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header