import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register as apiRegister } from '../services/authService'
import Toast from '../components/ui/Toast'

// --- 1. IMPORT DE L'IMAGE D'AMBIANCE CONSERVÉ ---
import loginBgImage from '../assets/products/image1.png'; // Importation de l'image (Assure-toi qu'elle est HQ)

export default function Login() {
  const navigate = useNavigate()
  // Extrais l'état de l'utilisateur de useAuth (VÉRIFIE LE NOM DANS TON CONTEXTE)
  const { login, loading, user } = useAuth() 
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [toast, setToast] = useState({ message: '', type: 'success' })

  // --- REDIRECTION VIA EFFET (DÉJÀ FAIT) ---
  useEffect(() => {
    if (user) {
      console.log("Utilisateur détecté, redirection vers l'accueil...")
      // Optionnel : un très court délai si tu tiens à afficher le Toast de succès
      const timer = setTimeout(() => navigate('/'), 200) 
      return () => clearTimeout(timer) // Nettoyage du timer
    }
  }, [user, navigate])
  // ---------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setToast({ message: '', type: 'success' }) // Efface les anciens toasts

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
        )
        // C'est mieux si login() gère ça interne à AuthContext
        localStorage.setItem('user', JSON.stringify(registeredUser))
        localStorage.setItem('token', token)
        
        await login(form.email, form.password)
        setToast({
          message: 'Inscription réussie, bienvenue parmi nous !',
          type: 'success',
        })
      } catch (error) {
        setToast({
          message:
            error?.response?.data?.message || 'Une erreur est survenue lors de l\'inscription',
          type: 'error',
        })
      }
    }
  }

  return (
    // 2. CONTENEUR PRINCIPAL PLEIN ÉCRAN AVEC BG IMAGE (NETTE)
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative bg-slate-950" // Fond sombre par défaut
      style={{
        backgroundImage: `url(${loginBgImage})`, // Utilisation de l'image importée dynamiquement
      }}
    >
      {/* --- 3. SUPERPOSITION (OVERLAY) SOMBRE ET CHALEUREUSE (SANS BLUR) --- */}
      {/* C'est cet overlay qui assure le contraste du texte et la clarté visuelle générale */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-950/80 to-amber-950/90 z-0" />

      {/* COMPOSANT TOAST (CORRECTLY PLACED) */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* 4. AMÉLIORATION DE LA CARTE DE CONNEXION (Plus épurée, z-10) */}
      <div className="card-sable w-full max-w-md bg-white/95 px-8 py-9 shadow-2xl rounded-3xl relative z-10 border border-sable-100/50 backdrop-blur-sm">
        
        <div className="mb-8 text-center space-y-2">
          <h1 className="font-heading text-3xl font-extrabold text-slate-950 tracking-tight">
            Espace client
          </h1>
          <p className="max-w-xs mx-auto text-sm text-slate-600 leading-relaxed">
            Accédez à vos commandes et sauvegardez vos pièces préférées d'Artistique Machine.
          </p>
        </div>

        {/* ONGLETS (TABS) STYLISÉS */}
        <div className="mb-7 grid grid-cols-2 gap-1 rounded-full bg-sable-100 p-1.5 border border-sable-200/50 shadow-inner">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              tab === 'login'
                ? 'bg-white text-terracotta-700 shadow-md'
                : 'text-slate-700 hover:text-terracotta-600'
            }`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              tab === 'register'
                ? 'bg-white text-terracotta-700 shadow-md'
                : 'text-slate-700 hover:text-terracotta-600'
            }`}
          >
            Inscription
          </button>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === 'register' && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-800 ml-1">
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-full border border-sable-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-inner focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 transition placeholder:text-slate-400"
                placeholder="Votre nom"
                required={tab === 'register'}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-slate-800 ml-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-full border border-sable-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-inner focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 transition placeholder:text-slate-400"
              placeholder="votre@email.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-slate-800 ml-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-full border border-sable-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-inner focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 transition placeholder:text-slate-400"
              placeholder="••••••••"
              required
            />
          </div>

          {/* 5. BOUTON PRIMAIRE STYLISÉ DIRECTEMENT ICI */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center rounded-full bg-terracotta-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-terracotta-700 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 mt-6"
          >
            {loading ? 'Chargement...' : tab === 'login' ? 'Se connecter' : "Créer mon compte"}
          </button>
        </form>

      </div>
    </div>
  )
}