import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register as apiRegister } from '../services/authService'
import Toast from '../components/ui/Toast'

import loginBgImage from '../assets/products/image1.png';

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, user } = useAuth()

  const [tab, setTab] = useState('login')

  // ✅ ajout phone
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })

  const [toast, setToast] = useState({ message: '', type: 'success' })

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => navigate('/'), 200)
      return () => clearTimeout(timer)
    }
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setToast({ message: '', type: 'success' })

    if (tab === 'login') {
      const result = await login(form.email, form.password)
      if (result.success) {
        setToast({ message: 'Connexion réussie, bienvenue !', type: 'success' })
      } else {
        setToast({ message: result.message, type: 'error' })
      }
    } else {
      try {
        const { user: registeredUser, token } = await apiRegister(
          form.name,
          form.email,
          form.password,
          form.phone // ✅ envoyé au backend
        )

        localStorage.setItem('user', JSON.stringify(registeredUser))
        localStorage.setItem('token', token)

        await login(form.email, form.password)

        setToast({
          message: 'Inscription réussie, bienvenue !',
          type: 'success',
        })
      } catch (error) {
        setToast({
          message:
            error?.response?.data?.message ||
            "Erreur lors de l'inscription",
          type: 'error',
        })
      }
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative bg-slate-950"
      style={{ backgroundImage: `url(${loginBgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-950/80 to-amber-950/90 z-0" />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      <div className="card-sable w-full max-w-md bg-white/95 px-8 py-9 shadow-2xl rounded-3xl relative z-10 border border-sable-100/50 backdrop-blur-sm">

        <div className="mb-8 text-center space-y-2">
          <h1 className="font-heading text-3xl font-extrabold text-slate-950">
            Espace client
          </h1>
          <p className="text-sm text-slate-600">
            Accédez à vos commandes et sauvegardez vos produits.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-7 grid grid-cols-2 gap-1 rounded-full bg-sable-100 p-1.5">
          <button
            onClick={() => setTab('login')}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === 'login'
                ? 'bg-white text-terracotta-700'
                : 'text-slate-700'
            }`}
          >
            Connexion
          </button>

          <button
            onClick={() => setTab('register')}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === 'register'
                ? 'bg-white text-terracotta-700'
                : 'text-slate-700'
            }`}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nom */}
          {tab === 'register' && (
            <div>
              <label className="text-xs font-semibold">Nom complet</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-full border px-5 py-3"
                required
              />
            </div>
          )}

          {/* Téléphone */}
          {tab === 'register' && (
            <div>
              <label className="text-xs font-semibold">Téléphone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="06XXXXXXXX"
                className="w-full rounded-full border px-5 py-3"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-full border px-5 py-3"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold">Mot de passe</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-full border px-5 py-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-terracotta-600 py-3 text-white"
          >
            {loading
              ? 'Chargement...'
              : tab === 'login'
              ? 'Se connecter'
              : 'Créer mon compte'}
          </button>

        </form>
      </div>
    </div>
  )
}