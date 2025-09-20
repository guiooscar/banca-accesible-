import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const navItems = [
    { id: 'dashboard', label: 'Inicio', path: '/' },
    { id: 'accounts', label: 'Mis Cuentas', path: '/accounts' },
    { id: 'transfers', label: 'Transferencias', path: '/transfers' },
    { id: 'payments', label: 'Pagos', path: '/payments' },
    { id: 'support', label: 'Soporte', path: '/support' }
  ]

  return (
    <nav className="bg-white border-b border-gray-200" aria-label="Navegación principal">
      <div className="container-fluid">
        <ul className="nav nav-underline">
          {navItems.map(item => (
            <li className="nav-item" key={item.id}>
              <NavLink
                to={item.path}
                className="nav-link px-4 py-3"
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation