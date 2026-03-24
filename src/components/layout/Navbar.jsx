import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { itemCount } = useCartContext()
  const { isAuthenticated, user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinkClasses =
    'text-sm font-medium tracking-wide text-slate-700 hover:text-terracotta-600 transition-colors'

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-sable-200 bg-sable-100/95 backdrop-blur shadow-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-500 text-white shadow-card">
              <span className="text-lg font-heading">A</span>
            </div>
            <div className="leading-tight">
              <div className="font-heading text-lg font-semibold text-terracotta-600">
                Artistique Machine
              </div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-ocre-500">
                Boutique d&apos;art marocain
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={navLinkClasses}>
              Accueil
            </NavLink>
            <NavLink to="/products" className={navLinkClasses}>
              Produits
            </NavLink>
            <NavLink to="/a-propos" className={navLinkClasses}>
              À propos
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className="text-sm font-medium text-terracotta-600 hover:text-terracotta-500 transition-colors">
                Admin
              </NavLink>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/cart"
            className="relative inline-flex h-10 items-center justify-center rounded-full border border-sable-200 bg-white px-4 text-slate-700 shadow-sm hover:border-terracotta-500 hover:text-terracotta-600"
          >
            <span className="mr-2 text-xs font-semibold uppercase tracking-wide">
              Panier
            </span>
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-terracotta-500 text-xs font-semibold text-white shadow-card">
              {itemCount}
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-menthe-500 text-sm font-semibold text-white shadow-card">
                {user?.name?.[0]?.toUpperCase() || 'C'}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-medium text-slate-600 hover:text-terracotta-600"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-secondary hidden text-xs sm:inline-flex">
              Connexion
            </Link>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-sable-200 bg-white p-2 text-slate-700 hover:border-terracotta-500 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <span className="space-y-1">
              <span className="block h-0.5 w-5 bg-slate-800" />
              <span className="block h-0.5 w-4 bg-slate-800" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-sable-200 bg-sable-100/95 md:hidden">
          <div className="container-page flex flex-col gap-3 py-3 pb-4">
            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClasses}>
              Accueil
            </NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)} className={navLinkClasses}>
              Produits
            </NavLink>
            <NavLink to="/a-propos" onClick={() => setOpen(false)} className={navLinkClasses}>
              À propos
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-terracotta-600"
              >
                Admin
              </NavLink>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="btn-secondary mt-1 justify-center text-xs"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}