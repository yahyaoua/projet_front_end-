import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import { useFeaturedProducts } from '../hooks/useProducts'

export default function Home() {
  const { products, loading } = useFeaturedProducts()

  const categories = ['Poterie', 'Tapis', 'Bijoux', 'Bois', 'Cuir', 'Textile']

  return (
    <div className="space-y-16">
      <section className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-ocre-400/60 bg-sable-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ocre-500">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
            Créations 100% faites main au Maroc
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
            Découvrez l&apos;univers Artistique Machine
          </h1>
          <p className="max-w-xl text-sm md:text-base text-slate-700">
            Une sélection soignée de pièces uniques, tissées, sculptées et
            façonnées à la main par des artisans passionnés à travers le Maroc.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/products" className="btn-primary">
              Explorer les produits
            </Link>
            <a href="#about" className="btn-secondary">
              En savoir plus
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-menthe-500" />
              Pièces sélectionnées directement auprès des ateliers
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
              Paiement sécurisé
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="card-sable relative overflow-hidden bg-gradient-to-br from-sable-100 via-sable-200/70 to-sable-100">
            <div className="absolute inset-0 bg-pattern-moroccan bg-moroccan-sm opacity-20" />
            <div className="relative grid grid-cols-2 gap-3 p-4">
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src="https://picsum.photos/400/400?random=21"
                    alt="Tapis berbère"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src="https://picsum.photos/400/400?random=22"
                    alt="Poterie marocaine"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src="https://picsum.photos/400/400?random=23"
                    alt="Lanternes marocaines"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src="https://picsum.photos/400/400?random=24"
                    alt="Bijoux marocains"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Sélection de pièces mises en avant
            </h2>
            <p className="text-sm text-slate-600">
              Découvrez quelques-uns de nos coups de cœur, choisis pour leur
              authenticité et leur histoire.
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-medium text-terracotta-600 hover:text-terracotta-500"
          >
            Voir tous les produits
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 6)} loading={loading} />
      </section>

      <section id="about" className="space-y-6">
        <h2 className="font-heading text-2xl font-semibold text-slate-900">
          Catégories d&apos;artisanat
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category}
              className="card-sable flex flex-col items-center justify-center bg-white/90 px-3 py-4 text-center"
            >
              <span className="mb-1 h-1 w-8 rounded-full bg-terracotta-500" />
              <p className="font-medium text-sm text-slate-800">{category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

