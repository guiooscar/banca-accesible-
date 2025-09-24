import axios from 'axios'

const API_BASE = '/api'

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para simular autenticación
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejo de errores globales
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en API:', error.message)
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Servicios
export const authService = {
  login: async (username, password) => {
    try {
      const { data } = await api.get(`/users?username=${username}&password=${password}`)
      if (data[0]) {
        localStorage.setItem('authToken', `token-${data[0].id}`)
        return data[0]
      }
      return null
    } catch (err) {
      console.error('Error al autenticar:', err)
      return null
    }
  },
  register: async (userData) => {
    try {
      const { data } = await api.post('/users', {
        ...userData,
        id: Date.now() // ID único temporal
      })
      return data
    } catch (err) {
      console.error('Error al registrar usuario:', err)
      throw new Error('No se pudo registrar el usuario')
    }
  },
  logout: () => {
    localStorage.removeItem('authToken')
  }
}

export const accountService = {
  getAccounts: async (userId) => {
    if (!userId) throw new Error('userId is required')
    try {
      const { data } = await api.get(`/accounts?userId=${userId}`)
      return data
    } catch (err) {
      console.error('Error al obtener cuentas del usuario:', err)
      throw new Error('Error al cargar las cuentas del usuario')
    }
  },
  getAllAccounts: async () => {
    try {
      const { data } = await api.get('/accounts')
      return data
    } catch (err) {
      console.error('Error al obtener todas las cuentas:', err)
      throw new Error('Error al cargar todas las cuentas del sistema')
    }
  },
  updateAccount: async (accountId, accountData) => {
    if (!accountId) throw new Error('accountId is required')
    try {
      const { data } = await api.patch(`/accounts/${accountId}`, accountData)
      return data
    } catch (err) {
      console.error('Error al actualizar cuenta:', err)
      throw new Error('Error al actualizar el saldo de la cuenta')
    }
  }
}

export const transactionService = {
  getTransactions: async (userId) => {
    if (!userId) throw new Error('userId is required')
    try {
      const { data } = await api.get(`/transactions?userId=${userId}`)
      return data
    } catch (err) {
      console.error('Error al obtener transacciones:', err)
      throw new Error('Error al cargar las transacciones')
    }
  },
  createTransaction: async (transactionData) => {
    try {
      const transaction = {
        ...transactionData,
        id: Date.now(), // ID único temporal
        timestamp: new Date().toISOString()
      }
      const { data } = await api.post('/transactions', transaction)
      return data
    } catch (err) {
      console.error('Error al crear transacción:', err)
      throw new Error('Error al registrar la transacción')
    }
  },
  getAllTransactions: async () => {
    try {
      const { data } = await api.get('/transactions')
      return data
    } catch (err) {
      console.error('Error al obtener todas las transacciones:', err)
      throw new Error('Error al cargar todas las transacciones')
    }
  }
}
