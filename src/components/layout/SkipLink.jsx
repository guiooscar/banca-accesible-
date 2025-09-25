// src/components/layout/SkipLink.jsx
import React from 'react'

const SkipLink = () => {
  return (
    <a
      className="skip-link"
      href="#main-content"
      tabIndex="0"
      aria-label="Saltar al contenido principal"
    >
      Saltar al contenido principal
    </a>
  )
}

export default SkipLink