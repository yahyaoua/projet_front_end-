import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import Loader from '../components/ui/Loader'
import ProductGrid from '../components/product/ProductGrid'
import MiroirFormModal from '../components/ui/MiroirFormModal'
import { getFeaturedProducts, getProductById } from '../services/productService'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCartContext()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [miroirOpen, setMiroirOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      try {
        const p = await getProductById(id)
        const featured = await getFeaturedProducts()
        if (isMounted) {
          setProduct(p)
          setRelated(
            featured.filter((item) => item._id !== p._id).slice(0, 3),
          )
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return <Loader label="Chargement du produit..." />
  }

  if (!product) {
    return (
      <p className="rounded-2xl border border-dashed border-sable-200 bg-white/70 px-4 py-10 text-center text-sm text-slate-500">
        Ce produit n&apos;est pas disponible pour le moment.
      </p>
    )
  }

  const isMiroir = product.category === 'Miroir'

  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2">
        <div className="card-sable relative overflow-hidden bg-sable-200">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-pattern-moroccan bg-moroccan-sm opacity-20" />
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocre-500">
            {product.category}
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-slate-900">
            {product.name}
          </h1>
          <p className="text-sm font-medium text-slate-500">
            {product.artisan}
          </p>
          <p className="mt-4 text-lg text-slate-700">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-terracotta-600">
            {product.price.toLocaleString('fr-MA')} MAD
          </p>
          <p className="text-xs text-slate-500">
            {product.stock > 0
              ? `${product.stock} pièces disponibles`
              : 'Bientôt de retour'}
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() =>
                isMiroir ? setMiroirOpen(true) : addItem(product)
              }
              className="btn-primary"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Produits associés
          </h2>
        </div>
        <ProductGrid products={related} loading={false} />
      </section>

      <MiroirFormModal
        open={miroirOpen}
        product={product}
        onClose={() => setMiroirOpen(false)}
        onSubmit={(options) => {
          addItem(product, options)
          setMiroirOpen(false)
        }}
      />
    </div>
  )
}

