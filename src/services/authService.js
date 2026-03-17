import api from './api'

export async function login(email, password) {
  // Mocked auth for demo: accept any non-empty email/password
  if (!import.meta.env.VITE_API_URL) {
    if (!email || !password) {
      throw new Error('Email et mot de passe requis')
    }
    const user = {
      id: 1,
      name: email.split('@')[0] || 'Client',
      email,
    }
    const token = 'mock-token-artisanat-maroc'
    return { user, token }
  }

  const response = await api.post('/api/auth/login', { email, password })
  return response.data
}

export async function register(name, email, password) {
  if (!import.meta.env.VITE_API_URL) {
    if (!name || !email || !password) {
      throw new Error('Tous les champs sont requis')
    }
    const user = { id: Date.now(), name, email }
    const token = 'mock-token-artisanat-maroc'
    return { user, token }
  }

  const response = await api.post('/api/auth/register', { name, email, password })
  return response.data
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

