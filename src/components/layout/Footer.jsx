import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sable-200/80 bg-sable-100/80">
      
      <div className="container-page grid gap-8 py-10 md:grid-cols-4">
        
        {/* LOGO + DESCRIPTION */}
        <div>
          <p className="font-heading text-lg text-slate-900">
            Artistique Machine
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Entreprise basée à Marrakech, spécialisée dans la création de miroirs,
            d’articles en cuir et de décorations artistiques alliant tradition et modernité.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Navigation
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>
              <Link to="/" className="hover:text-terracotta-500">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-terracotta-500">
                Produits
              </Link>
            </li>
            <li>
              <a href="#about" className="hover:text-terracotta-500">
                À propos
              </a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-terracotta-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CATÉGORIES */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Nos spécialités
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>Miroirs décoratifs</li>
            <li>Articles en cuir</li>
            <li>Décoration murale</li>
            <li>Créations sur mesure</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Contact
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>Marrakech, Maroc</li>
            <li>Email : contact@artistiquemachine.com</li>
            <li>Tél : +212 6 58772808</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-sable-200/80">
        <div className="container-page flex flex-col gap-3 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          
          <span>
            © {new Date().getFullYear()} Artistique Machine — Tous droits réservés
          </span>

          <div className="flex items-center gap-3">
            <span>Fait avec passion à Marrakech</span>
            <span className="hidden h-1 w-1 rounded-full bg-ocre-500 md:inline-block" />
            <span>Artisanat & design moderne</span>
          </div>

        </div>
      </div>

    </footer>
  )
}