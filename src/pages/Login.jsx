import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register as apiRegister } from '../services/authService'
import Toast from '../components/ui/Toast'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (tab === 'login') {
      const result = await login(form.email, form.password)
      if (result.success) {
        setToast({ message: 'Connexion réussie, bienvenue !', type: 'success' })
        setTimeout(() => navigate('/'), 800)
      } else {
        setToast({ message: result.message, type: 'error' })
      }
    } else {
      try {
        const { user, token } = await apiRegister(
          form.name,
          form.email,
          form.password,
        )
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        await login(form.email, form.password)
        setToast({
          message: 'Inscription réussie, bienvenue parmi nous !',
          type: 'success',
        })
        setTimeout(() => navigate('/'), 800)
      } catch (error) {
        setToast({
          message:
            error?.response?.data?.message || 'Une erreur est survenue',
          type: 'error',
        })
      }
    }
  }

  return (
    <div className="flex items-center justify-center py-10">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
      <div className="card-sable w-full max-w-md bg-white/95 px-6 py-7">
        <div className="mb-6 text-center">
          <h1 className="font-heading text-2xl font-semibold text-slate-900">
            Espace client
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Accédez à vos commandes et sauvegardez vos pièces préférées.
          </p>
        </div>
        <div className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-sable-100 p-1">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              tab === 'login'
                ? 'bg-white text-terracotta-600 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              tab === 'register'
                ? 'bg-white text-terracotta-600 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Inscription
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-700"
              >
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-full border border-sable-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/40"
                required
              />
            </div>
          )}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-full border border-sable-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/40"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-xs font-medium text-slate-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-full border border-sable-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/40"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-3 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {tab === 'login' ? 'Se connecter' : "Créer mon compte"}
          </button>
        </form>
      </div>
    </div>
  )
}

