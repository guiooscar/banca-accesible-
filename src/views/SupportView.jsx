import React from 'react'

const SupportView = () => {
  return (
    <div>
      <h2 className="mb-4">Soporte y Ayuda</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">📞 Línea de Atención</h5>
              <p className="card-text">Llámanos al <strong>0800-XXX-XXXX</strong></p>
              <p className="text-muted small">Horario: Lunes a Viernes, 8am - 8pm</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">✉️ Chat en Vivo</h5>
              <p className="card-text">Haz clic en el botón flotante para chatear con un asesor.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">✉️ Formulario de Contacto</h5>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea className="form-control" rows="4"></textarea>
            </div>
            <button className="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SupportView