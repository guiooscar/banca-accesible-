import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-top mt-auto" role="contentinfo">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Banca en Línea</h5>
            <p className="text-muted small">
              Su socio financiero confiable, ofreciendo servicios bancarios seguros y accesibles desde cualquier lugar.
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-semibold">Servicios</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Cuentas</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Tarjetas</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Préstamos</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Inversiones</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-semibold">Soporte</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Ayuda</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Contacto</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">FAQ</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Seguridad</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6 className="fw-semibold">Legal</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Términos</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Privacidad</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Cookies</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-block py-1">Accesibilidad</a></li>
            </ul>
          </div>
        </div>
        <div className="border-top pt-4 mt-4 text-center">
          <p className="text-muted small mb-0">
            © 2025 Banca en Línea. Todos los derechos reservados. | 
            <button className="btn btn-link text-primary p-0 ms-2" aria-label="Declaración de Accesibilidad">
              Declaración de Accesibilidad
            </button>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer