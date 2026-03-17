import Loader from '../ui/Loader'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return <Loader label="Chargement des produits..." />
  }

  if (!products || products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-sable-200 bg-white/70 px-4 py-10 text-center text-sm text-slate-500">
        Aucun produit ne correspond à votre recherche pour le moment.
      </p>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

