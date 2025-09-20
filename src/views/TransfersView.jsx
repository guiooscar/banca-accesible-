import React, { useState } from 'react'

const TransfersView = () => {
  const [formData, setFormData] = useState({
    toAccount: '',
    amount: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.toAccount) newErrors.toAccount = 'Requerido'
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Monto inválido'
    if (!formData.description) newErrors.description = 'Requerido'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    // Simular envío
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setFormData({ toAccount: '', amount: '', description: '' })
    }, 3000)
  }

  return (
    <div>
      <h2 className="mb-4">Realizar Transferencia</h2>

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert" aria-live="assertive">
          <strong>¡Éxito!</strong> Transferencia realizada correctamente.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="toAccount" className="form-label">Cuenta Destino</label>
          <input
            type="text"
            className={`form-control ${errors.toAccount ? 'is-invalid' : ''}`}
            id="toAccount"
            name="toAccount"
            value={formData.toAccount}
            onChange={handleChange}
            required
            aria-describedby="toAccountHelp"
          />
          <div id="toAccountHelp" className="form-text">Ingrese el número de cuenta o alias.</div>
          {errors.toAccount && <div className="invalid-feedback">{errors.toAccount}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Monto ($)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            aria-describedby="amountHelp"
          />
          <div id="amountHelp" className="form-text">Mínimo $0.01</div>
          {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input
            type="text"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            aria-describedby="descriptionHelp"
          />
          <div id="descriptionHelp" className="form-text">Ej: Pago de servicios, regalo, etc.</div>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <button type="submit" className="btn btn-success px-5 py-3 rounded-3 fw-bold">
          Transferir Ahora
        </button>
      </form>
    </div>
  )
}

export default TransfersView