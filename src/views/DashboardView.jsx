import React, { useState, useEffect } from 'react'
import { accountService, transactionService } from '../services/api'

const DashboardView = ({ user }) => {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const userAccounts = await accountService.getAccounts(user.id)
      const userTransactions = await transactionService.getTransactions(user.id)
      setAccounts(userAccounts)
      setTransactions(userTransactions.slice(0, 4)) // últimos 4
    }
    loadData()
  }, [user.id])

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div>
      {/* Banner de bienvenida */}
      <div className="bg-primary bg-gradient text-white rounded-4 p-5 mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <div>
            <h2 className="h3 fw-bold">¡Bienvenido de nuevo, {user.name}!</h2>
            <p className="opacity-75">Último acceso: Hoy a las 09:45 AM</p>
          </div>
          <div className="mt-4 mt-md-0 text-md-end">
            <p className="small opacity-75">Saldo total</p>
            <p className="h2 fw-bold">
              ${totalBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="row g-4 mb-5">
        {[
          { label: 'Transferir', icon: '→', color: 'bg-success bg-opacity-10 text-success', path: '/transfers' },
          { label: 'Pagar', icon: '💳', color: 'bg-info bg-opacity-10 text-info', path: '/payments' },
          { label: 'Depositar', icon: '+', color: 'bg-primary bg-opacity-10 text-primary', path: '#' },
          { label: 'Retirar', icon: '-', color: 'bg-danger bg-opacity-10 text-danger', path: '#' }
        ].map((action, idx) => (
          <div className="col-6 col-md-3" key={idx}>
            <a
              href={action.path}
              className={`text-decoration-none rounded-3 p-4 d-flex flex-column align-items-center justify-content-center ${action.color} h-100`}
              style={{ minHeight: '120px' }}
              aria-label={action.label}
            >
              <div className="display-4 mb-2">{action.icon}</div>
              <span className="fw-medium">{action.label}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Resumen de cuentas */}
      <div className="card rounded-4 shadow-sm mb-5">
        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
          <h3 className="h5 fw-bold mb-0">Mis Cuentas</h3>
          <a href="/accounts" className="text-decoration-none small">Ver todas</a>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {accounts.map(account => (
              <div className="col-12" key={account.id}>
                <div
                  className="p-4 bg-light border rounded-3 d-flex justify-content-between align-items-center"
                  tabIndex="0"
                  role="button"
                  aria-label={`${account.type}, número ${account.number}, saldo ${account.balance} ${account.currency}`}
                >
                  <div>
                    <h5 className="mb-1">{account.type}</h5>
                    <p className="text-muted small mb-0">{account.number}</p>
                  </div>
                  <div className="text-end">
                    <p className={`mb-0 h5 fw-bold ${account.balance < 0 ? 'text-danger' : ''}`}>
                      {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-muted small mb-0">{account.currency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transacciones recientes */}
      <div className="card rounded-4 shadow-sm">
        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
          <h3 className="h5 fw-bold mb-0">Transacciones Recientes</h3>
          <a href="#" className="text-decoration-none small">Ver todas</a>
        </div>
        <div className="card-body">
          <div className="list-group list-group-flush">
            {transactions.map(tx => (
              <div
                key={tx.id}
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-3"
              >
                <div>
                  <h6 className="mb-1">{tx.description}</h6>
                  <small className="text-muted">{tx.category} • {tx.date}</small>
                </div>
                <span className={`fw-bold ${tx.amount < 0 ? 'text-danger' : 'text-success'}`}>
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView