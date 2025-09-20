import axios from 'axios'

const API_BASE = '/api'

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para simular autenticación (opcional)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Servicios
export const authService = {
  login: async (username, password) => {
    try {
      const { data } = await api.get(`/users?username=${username}&password=${password}`)
      return data[0] || null
    } catch (err) {
      console.error('Error al autenticar:', err)
      return null
    }
  },

  register: async (userData) => {
    try {
      const { data } = await api.post('/users', userData)
      return data
    } catch (err) {
      console.error('Error al registrar usuario:', err)
      throw new Error('No se pudo registrar el usuario')
    }
  }
}

export const accountService = {
  getAccounts: async (userId) => {
    const { data } = await api.get(`/accounts?userId=${userId}`)
    return data
  }
}

export const transactionService = {
  getTransactions: async (userId) => {
    const { data } = await api.get(`/transactions?userId=${userId}`)
    return data
  }
}