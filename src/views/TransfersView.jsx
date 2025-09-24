import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { accountService, transactionService } from '../services/api'

const TransfersView = ({ user }) => {
  const [accounts, setAccounts] = useState([])
  const [allAccounts, setAllAccounts] = useState([])
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccountNumber: '',
    amount: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadAccounts = async () => {
      if (!user || !user.id) {
        setErrors({ submit: 'Usuario no autenticado. Por favor, inicie sesión nuevamente.' })
        setIsLoadingAccounts(false)
        return
      }

      try {
        const [userAccounts, allAccountsData] = await Promise.all([
          accountService.getAccounts(user.id),
          accountService.getAllAccounts()
        ])
        
        setAccounts(userAccounts)
        setAllAccounts(allAccountsData)
        setErrors(prev => ({ ...prev, submit: '' }))
        
      } catch (err) {
        setErrors({ submit: `Error al cargar cuentas: ${err.message}. Verifique que json-server esté ejecutándose.` })
      } finally {
        setIsLoadingAccounts(false)
      }
    }

    loadAccounts()
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const findDestinationAccount = (inputNumber) => {
    if (!inputNumber) return null
    const cleanInput = inputNumber.replace(/[^0-9]/g, '')
    return allAccounts.find(acc => {
      const cleanAccNumber = acc.number.replace(/[^0-9]/g, '')
      return cleanAccNumber === cleanInput
    })
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.fromAccount) {
      newErrors.fromAccount = 'Seleccione una cuenta de origen'
    }

    if (!formData.toAccountNumber.trim()) {
      newErrors.toAccountNumber = 'Ingrese número de cuenta destino'
    } else {
      const destinationAccount = findDestinationAccount(formData.toAccountNumber)
      if (!destinationAccount) {
        newErrors.toAccountNumber = 'Cuenta destino no encontrada'
      } else if (destinationAccount.userId === user.id) {
        newErrors.toAccountNumber = 'No puede transferir a sus propias cuentas'
      } else {
        newErrors._destinationAccount = destinationAccount
      }
    }

    const amount = parseFloat(formData.amount)
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Ingrese un monto válido mayor a 0'
    } else if (amount < 100) {
      newErrors.amount = 'El monto mínimo es 100 COP'
    } else {
      const sourceAccount = accounts.find(acc => acc.id == formData.fromAccount)
      if (sourceAccount && amount > sourceAccount.balance) {
        newErrors.amount = `Saldo insuficiente. Disponible: $${sourceAccount.balance.toLocaleString('es-CO')} COP`
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Ingrese una descripción para la transferencia'
    } else if (formData.description.trim().length < 3) {
      newErrors.description = 'La descripción debe tener al menos 3 caracteres'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    const { _destinationAccount, ...displayErrors } = validationErrors

    if (Object.keys(displayErrors).length > 0) {
      setErrors(displayErrors)
      return
    }

    setIsLoading(true)
    setSuccess(false)
    setErrors({})

    try {
      const sourceAccount = accounts.find(acc => acc.id == formData.fromAccount)
      const destinationAccount = validationErrors._destinationAccount
      const amount = parseFloat(formData.amount)

      // Actualizar saldos
      await accountService.updateAccount(sourceAccount.id, { balance: sourceAccount.balance - amount })
      await accountService.updateAccount(destinationAccount.id, { balance: destinationAccount.balance + amount })

      // Crear transacciones
      const transactionData = {
        userId: user.id,
        toUserId: destinationAccount.userId,
        fromAccountId: sourceAccount.id,
        toAccountId: destinationAccount.id,
        fromAccountNumber: sourceAccount.number,
        toAccountNumber: destinationAccount.number,
        description: formData.description.trim(),
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        category: 'Transferencia',
        type: 'transfer_out',
        status: 'completed'
      }

      const recipientTransactionData = {
        userId: destinationAccount.userId,
        fromUserId: user.id,
        fromAccountId: sourceAccount.id,
        toAccountId: destinationAccount.id,
        fromAccountNumber: sourceAccount.number,
        toAccountNumber: destinationAccount.number,
        description: `Transferencia recibida: ${formData.description.trim()}`,
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        category: 'Transferencia',
        type: 'transfer_in',
        status: 'completed'
      }

      await transactionService.createTransaction(transactionData)
      await transactionService.createTransaction(recipientTransactionData)

      // Éxito
      setSuccess(true)
      setFormData({ fromAccount: '', toAccountNumber: '', amount: '', description: '' })

      // Recargar saldos
      const updatedAccounts = await accountService.getAccounts(user.id)
      setAccounts(updatedAccounts)

      setTimeout(() => {
        navigate('/')
      }, 3000)

    } catch (err) {
      setErrors({ 
        submit: `Error al realizar la transferencia: ${err.message}. Verifique su conexión e intente nuevamente.` 
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingAccounts) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" aria-busy="true" aria-label="Cargando cuentas, por favor espere">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando cuentas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5" role="main" aria-label="Formulario de transferencia bancaria" tabIndex="-1">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg rounded-4">
            <div className="card-header bg-primary text-white py-4">
              <h2 className="mb-0 h4 fw-bold text-center">
                Realizar Transferencia
              </h2>
            </div>
            <div className="card-body p-5">

              {/* Mensajes de error y éxito */}
              {errors.submit && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert" aria-live="assertive">
                  <strong>¡Error!</strong> {errors.submit}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
                </div>
              )}

              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert" aria-live="assertive">
                  <strong>¡Transferencia exitosa!</strong> Será redirigido al inicio en unos segundos.
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate aria-live="polite">

                <fieldset>
                  <legend className="visually-hidden">Detalles de la transferencia</legend>

                  {/* Cuenta de Origen */}
                  <div className="mb-4">
                    <label htmlFor="fromAccount" className="form-label fw-bold">
                      Cuenta de Origen
                    </label>
                    <select
                      id="fromAccount"
                      className={`form-select form-select-lg rounded-3 ${errors.fromAccount ? 'is-invalid' : ''}`}
                      name="fromAccount"
                      value={formData.fromAccount}
                      onChange={handleChange}
                      required
                      disabled={accounts.length === 0}
                      aria-describedby={errors.fromAccount ? "fromAccount-error" : undefined}
                      aria-invalid={errors.fromAccount ? "true" : "false"}
                    >
                      <option value="">
                        {accounts.length === 0 ? 'No tienes cuentas disponibles' : 'Seleccione una cuenta'}
                      </option>
                      {accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.type} - {account.number} - ${account.balance.toLocaleString('es-CO')} COP
                        </option>
                      ))}
                    </select>
                    {errors.fromAccount && <div id="fromAccount-error" className="invalid-feedback d-block">{errors.fromAccount}</div>}
                  </div>

                  {/* Cuenta Destino */}
                  <div className="mb-4">
                    <label htmlFor="toAccountNumber" className="form-label fw-bold">
                      Número de Cuenta Destino
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg rounded-3 ${errors.toAccountNumber ? 'is-invalid' : ''}`}
                      id="toAccountNumber"
                      name="toAccountNumber"
                      value={formData.toAccountNumber}
                      onChange={handleChange}
                      placeholder="Ej: **** 1234"
                      required
                      maxLength="20"
                      aria-describedby={errors.toAccountNumber ? "toAccountNumber-error" : "toAccountNumber-help"}
                      aria-invalid={errors.toAccountNumber ? "true" : "false"}
                    />
                    {errors.toAccountNumber && <div id="toAccountNumber-error" className="invalid-feedback d-block">{errors.toAccountNumber}</div>}
                    <div id="toAccountNumber-help" className="form-text text-muted small">
                      Puede ingresar solo los últimos 4 dígitos o el formato completo.
                    </div>
                  </div>

                  {/* Monto */}
                  <div className="mb-4">
                    <label htmlFor="amount" className="form-label fw-bold">
                      Monto (COP)
                    </label>
                    <input
                      type="number"
                      step="100"
                      min="100"
                      className={`form-control form-control-lg rounded-3 ${errors.amount ? 'is-invalid' : ''}`}
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="100"
                      required
                      aria-describedby={errors.amount ? "amount-error" : "amount-help"}
                      aria-invalid={errors.amount ? "true" : "false"}
                    />
                    {errors.amount && <div id="amount-error" className="invalid-feedback d-block">{errors.amount}</div>}
                    <div id="amount-help" className="form-text text-muted small">
                      Monto mínimo: 100 COP
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mb-5">
                    <label htmlFor="description" className="form-label fw-bold">
                      Descripción
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg rounded-3 ${errors.description ? 'is-invalid' : ''}`}
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Ej: Pago de deuda, regalo..."
                      required
                      maxLength="100"
                      aria-describedby={errors.description ? "description-error" : "description-help"}
                      aria-invalid={errors.description ? "true" : "false"}
                    />
                    {errors.description && <div id="description-error" className="invalid-feedback d-block">{errors.description}</div>}
                    <div id="description-help" className="form-text text-muted small">
                      Describe el motivo (mínimo 3 caracteres)
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg py-3 rounded-3 fw-bold"
                      disabled={isLoading || accounts.length === 0}
                      aria-label="Realizar transferencia de dinero"
                      aria-disabled={isLoading || accounts.length === 0}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Procesando...
                        </>
                      ) : (
                        'Transferir Ahora'
                      )}
                    </button>
                  </div>

                  {accounts.length === 0 && (
                    <div className="alert alert-warning mt-4 rounded-3" role="alert">
                      <strong>Advertencia:</strong> No tienes cuentas disponibles para realizar transferencias.
                    </div>
                  )}

                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransfersView