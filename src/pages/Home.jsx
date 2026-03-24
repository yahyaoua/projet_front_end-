import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import { useFeaturedProducts } from '../hooks/useProducts'
import miroir8 from '../assets/products/miroir8.png'
import product1 from '../assets/products/produit1.png'
import product2 from '../assets/products/produit2.png'
import miroir1 from '../assets/products/miroir1.png'

export default function Home() {
  const { products, loading } = useFeaturedProducts()

  const categories = [
    'Miroirs décoratifs',
    'Articles en cuir',
    'Décoration murale',
    'Objets artisanaux',
    'Design moderne',
    'Créations sur mesure'
  ]

  return (
    <div className="space-y-16">
      
      {/* HERO SECTION */}
      <section className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-center">
        <div className="space-y-6">
          
          <p className="inline-flex items-center gap-2 rounded-full border border-ocre-400/60 bg-sable-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ocre-500">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
            Créations artisanales & design moderne – Marrakech
          </p>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
            Artistique Machine : L'art de la décoration à Marrakech
          </h1>

          <p className="max-w-xl text-sm md:text-base text-slate-700">
            Spécialisée dans la création de miroirs, d'articles en cuir et de décorations artistiques,
            Artistique Machine vous propose des pièces uniques alliant savoir-faire traditionnel et design moderne.
            Chaque création est pensée pour sublimer vos espaces avec élégance et authenticité.
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
              Fabrication locale à Marrakech
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
              Qualité artisanale garantie
            </div>
          </div>
        </div>

        {/* IMAGES */}
        <div className="relative">
          <div className="card-sable relative overflow-hidden bg-gradient-to-br from-sable-100 via-sable-200/70 to-sable-100">
            <div className="absolute inset-0 bg-pattern-moroccan bg-moroccan-sm opacity-20" />
            
            <div className="relative grid grid-cols-2 gap-3 p-4">
              
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src={miroir8}
                    alt="Miroir artisanal"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src={product1}
                    alt="Objet en cuir"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src={product2}
                    alt="Décoration murale"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-sable-200">
                  <img
                    src={miroir1}
                    alt="Design artistique"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS */}
      <section className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Nos créations en vedette
            </h2>
            <p className="text-sm text-slate-600">
              Explorez nos miroirs décoratifs, articles en cuir et pièces artistiques,
              sélectionnés pour leur qualité et leur originalité.
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

      {/* CATÉGORIES */}
      <section id="about" className="space-y-6">
        <h2 className="font-heading text-2xl font-semibold text-slate-900">
          Nos spécialités
        </h2>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category}
              className="card-sable flex flex-col items-center justify-center bg-white/90 px-3 py-4 text-center"
            >
              <span className="mb-1 h-1 w-8 rounded-full bg-terracotta-500" />
              <p className="font-medium text-sm text-slate-800">
                {category}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl font-semibold text-slate-900">
          À propos de Artistique Machine
        </h2>

        <p className="text-sm text-slate-700 max-w-3xl">
          Basée à Marrakech, Artistique Machine est une entreprise spécialisée dans la décoration artistique,
          combinant artisanat marocain et créativité contemporaine. Nous concevons des miroirs élégants,
          des pièces en cuir raffinées et des objets décoratifs uniques.
        </p>

        <p className="text-sm text-slate-700 max-w-3xl">
          Notre objectif est de valoriser le savoir-faire local tout en proposant des créations modernes,
          adaptées aux besoins des particuliers et des professionnels.
        </p>
      </section>

    </div>
  )
}