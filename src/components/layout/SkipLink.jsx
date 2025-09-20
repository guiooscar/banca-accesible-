import React from 'react'

const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-link position-absolute top-0 start-50 translate-middle-x p-3 bg-primary text-white text-decoration-none fw-bold rounded"
      tabIndex="0"
      aria-label="Saltar al contenido principal"
      style={{
        transform: 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000
      }}
    >
      Saltar al contenido principal
    </a>
  )
}

export default SkipLink