import React from 'react'

const PaymentsView = () => {
  return (
    <div>
      <h2 className="mb-4">Realizar Pago</h2>
      <div className="alert alert-info">
        <strong>Próximamente:</strong> Pago de servicios, impuestos, colegiaturas, etc.
      </div>
      <div className="card">
        <div className="card-body">
          <p>Selecciona el servicio a pagar:</p>
          <ul>
            <li>Luz</li>
            <li>Agua</li>
            <li>Internet</li>
            <li>Teléfono</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PaymentsView