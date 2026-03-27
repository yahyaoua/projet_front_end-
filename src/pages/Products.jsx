import { useMemo, useState } from 'react'
import ProductGrid from '../components/product/ProductGrid'
import { useProducts } from '../hooks/useProducts'

const ALL_CATEGORIES = ['Tous', 'Miroir', 'Décoration', 'Cuir']

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tous')
  const { products, loading } = useProducts({})
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === 'Tous' || p.category === category
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.artisan.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-slate-900">
            Tous les produits
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Explorez notre collection complète de pièces artisanales venues des
            quatre coins du Maroc.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {filtered.length} produit{filtered.length > 1 ? 's' : ''} trouvé
            {filtered.length > 1 ? 's' : ''}.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou artisan..."
              className="w-full rounded-full border border-sable-200 bg-white/80 px-4 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  category === cat
                    ? 'border-terracotta-500 bg-terracotta-500 text-white shadow-card'
                    : 'border-sable-200 bg-white/80 text-slate-700 hover:border-terracotta-500 hover:text-terracotta-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid products={filtered} loading={loading} />
      </section>
    </div>
  )
}

