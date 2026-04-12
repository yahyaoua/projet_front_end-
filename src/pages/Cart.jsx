import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import { useCartContext } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Cart() {
  const { items, total, clearCart } = useCartContext()
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const [form, setForm] = useState({
    phone: '',
    address: ''
  })

  const shipping = items.length > 0 ? 60 : 0
  const grandTotal = total + shipping

  // 🇲🇦 VALIDATION MAROC
  const validatePhone = (phone) => {
    const regex = /^(?:\+212|0)([5-7]\d{8})$/
    return regex.test(phone)
  }

  const handleOrder = async () => {
    setError(null)

    // 🔴 1. CHECK EMPTY FIELDS
    if (!form.phone || !form.address) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }

    // 🔴 2. PHONE VALIDATION
    if (!validatePhone(form.phone)) {
      setError('Numéro invalide. Format marocain attendu: 06XXXXXXXX ou +2126XXXXXXXX')
      return
    }

    try {
      setLoading(true)

      const orderItems = items.map((item) => ({
        product: item._id || item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }))

      const orderData = {
        items: orderItems,
        totalPrice: grandTotal,
        shippingAddress: {
          name: user?.name,
          phone: form.phone,
          city: user?.city || 'Marrakech',
          address: form.address
        }
      }

      console.log("ORDER SENT 👉", orderData)

      await api.post('/api/orders', orderData)

      clearCart()
      navigate('/success')

    } catch (err) {
      const backendMessage = err.response?.data?.message
      setError(backendMessage || 'Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">

      {/* LEFT */}
      <section className="space-y-4">
        <h1 className="font-heading text-3xl font-semibold">
          Mon panier
        </h1>

        {items.length === 0 ? (
          <p>Panier vide</p>
        ) : (
          items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </section>

      {/* RIGHT */}
      <aside className="space-y-4">
        <div className="card-sable bg-white p-5">

          <h2 className="font-semibold">Informations livraison</h2>

          {/* PHONE */}
          <input
            type="text"
            placeholder="Téléphone (06XXXXXXXX)"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full border p-2 mt-3 rounded"
          />

          {/* ADDRESS */}
          <input
            type="text"
            placeholder="Adresse complète"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full border p-2 mt-3 rounded"
          />

          {/* TOTAL */}
          <div className="mt-4">
            <p>Total: {grandTotal} MAD</p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-3 text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            disabled={loading || items.length === 0}
            className="btn-primary mt-4 w-full"
          >
            {loading ? 'Traitement...' : 'Passer la commande'}
          </button>

        </div>
      </aside>

    </div>
  )
}