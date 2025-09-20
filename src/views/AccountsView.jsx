import React, { useState, useEffect } from 'react'
import { accountService } from '../services/api'

const AccountsView = ({ user }) => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const loadAccounts = async () => {
      const userAccounts = await accountService.getAccounts(user.id)
      setAccounts(userAccounts)
    }
    loadAccounts()
  }, [user.id])

  return (
    <div>
      <h2 className="mb-4">Todas Mis Cuentas</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle" aria-label="Tabla de cuentas bancarias">
          <caption className="visually-hidden">Lista de cuentas del usuario</caption>
          <thead>
            <tr>
              <th scope="col">Tipo de Cuenta</th>
              <th scope="col">Número</th>
              <th scope="col">Moneda</th>
              <th scope="col" className="text-end">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id}>
                <td>{account.type}</td>
                <td>{account.number}</td>
                <td>{account.currency}</td>
                <td className={`text-end fw-bold ${account.balance < 0 ? 'text-danger' : ''}`}>
                  {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountsView