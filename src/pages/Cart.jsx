import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import { useCartContext } from '../context/CartContext'
import api from '../services/api'

export default function Cart() {
  const { items, total, clearCart } = useCartContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const shipping = items.length > 0 ? 60 : 0
  const grandTotal = total + shipping

  const handleOrder = async () => {
    try {
      setLoading(true)
      setError(null)

      const orderItems = items.map((item) => ({
        product: item._id || item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }))

      await api.post('/api/orders', {
        items: orderItems,
        totalPrice: grandTotal,
        shippingAddress: {
          name: 'Client',
          phone: '0600000000',
          city: 'Marrakech',
          address: 'Adresse par défaut'
        }
      })

      clearCart()
      alert('Commande passée avec succès !')
      navigate('/')
    } catch (err) {
      // --- MODIFICATION ICI : On récupère le message d'erreur du backend ---
      const backendMessage = err.response?.data?.message 
      
      if (backendMessage) {
        // Affiche "Stock insuffisant pour..." ou tout autre message envoyé par le serveur
        setError(backendMessage) 
      } else {
        setError('Une erreur est survenue. Vérifiez votre connexion ou assurez-vous d’être connecté.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-semibold text-slate-900">
            Mon panier
          </h1>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-medium text-slate-500 hover:text-terracotta-600"
            >
              Vider le panier
            </button>
          )}
        </div>
        {items.length === 0 ? (
          <div className="card-sable flex flex-col items-center justify-center bg-white/80 px-6 py-10 text-center">
            <p className="font-heading text-lg text-slate-900">
              Votre panier est vide.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Découvrez nos créations artisanales et ajoutez vos pièces
              préférées.
            </p>
            <Link to="/products" className="btn-primary mt-4">
              Continuer mes achats
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem key={item.lineId ?? item.id} item={item} />
            ))}
            <Link
              to="/products"
              className="inline-flex text-xs font-medium text-terracotta-600 hover:text-terracotta-500"
            >
              Continuer mes achats
            </Link>
          </div>
        )}
      </section>

      <aside className="space-y-4">
        <div className="card-sable bg-white/90 p-5">
          <h2 className="font-heading text-lg font-semibold text-slate-900">
            Récapitulatif de commande
          </h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Sous-total</span>
              <span className="font-medium">
                {total.toLocaleString('fr-MA')} MAD
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Livraison estimée</span>
              <span className="font-medium">
                {shipping.toLocaleString('fr-MA')} MAD
              </span>
            </div>
            <div className="mt-3 border-t border-sable-200 pt-3 text-base font-semibold text-slate-900 flex items-center justify-between">
              <span>Total TTC</span>
              <span className="text-terracotta-600">
                {grandTotal.toLocaleString('fr-MA')} MAD
              </span>
            </div>
          </div>

          {/* Affichage de l'erreur dynamique */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-xs font-bold text-red-600">
                ⚠️ {error}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleOrder}
            disabled={items.length === 0 || loading}
            className="btn-primary mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Vérification...' : 'Passer la commande'}
          </button>
        </div>
      </aside>
    </div>
  )
}