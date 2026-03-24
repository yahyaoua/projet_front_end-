import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import MiroirFormModal from '../ui/MiroirFormModal'

const API_URL = import.meta.env.VITE_API_URL

export default function ProductCard({ product }) {
  const { addItem } = useCartContext()
  const [miroirOpen, setMiroirOpen] = useState(false)

  if (!product) return null
  const isMiroir = product.category === 'Miroir'

  return (
    <>
      <article className="card-sable flex flex-col overflow-hidden bg-gradient-to-br from-sable-100 to-sable-200/60">
        <div className="relative overflow-hidden bg-sable-200">
          <img
            src={product.image ? `${API_URL}/${product.image}` : '/placeholder.jpg'}
            alt={product.name}
            className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-pattern-moroccan bg-moroccan-sm opacity-10" />
          {product.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-menthe-500/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-card">
              Coup de cœur
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
          <h3 className="font-heading text-base font-semibold text-slate-900">
            {product.name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {product.artisan}
          </p>

          {/* ── Description ── */}
          {product.description && (
            <p className="text-sm text-slate-600 line-clamp-2">
              {product.description}
            </p>
          )}

          <p className="mt-2 text-lg font-semibold text-terracotta-600">
            {product.price.toLocaleString('fr-MA')} MAD
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              to={`/products/${product._id}`}
              className="btn-secondary text-xs"
            >
              Voir le produit
            </Link>
            <button
              type="button"
              onClick={() => (isMiroir ? setMiroirOpen(true) : addItem(product))}
              className="btn-primary text-xs"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </article>

      <MiroirFormModal
        open={miroirOpen}
        product={product}
        onClose={() => setMiroirOpen(false)}
        onSubmit={(options) => {
          addItem(product, options)
          setMiroirOpen(false)
        }}
      />
    </>
  )
}