// --- 1. AJOUT DES IMPORTS NÉCESSAIRES ---
import { useEffect, useState, useRef } from 'react' // Ajout de useRef
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { Upload } from 'lucide-react' // Import d'une icône moderne

const API_URL = import.meta.env.VITE_API_URL

export default function Admin() {
  const navigate = useNavigate()
  // --- 2. CRÉATION DE LA RÉFÉRENCE POUR L'INPUT CACHÉ ---
  const fileInputRef = useRef(null) 

  const storedUser = JSON.parse(localStorage.getItem('user'))
  const [activeTab, setActiveTab] = useState('produits')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Miroir',
    stock: '',
    featured: false,
    artisan: 'Artistique Machine'
  })

  useEffect(() => {
    if (!storedUser || storedUser.role !== 'admin') {
      navigate('/')
    }
  }, [storedUser, navigate]) // Ajout de dépendances pour useEffect

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'produits') {
        const res = await api.get('/api/products')
        setProducts(res.data)
      } else {
        const res = await api.get('/api/orders/admin')
        setOrders(res.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenAdd = () => {
    setEditProduct(null)
    setForm({
      name: '',
      description: '',
      price: '',
      category: 'Miroir',
      stock: '',
      featured: false,
      artisan: 'Artistique Machine'
    })
    setImageFile(null)
    setImagePreview('')
    setShowForm(true)
  }

  const handleOpenEdit = (product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      artisan: product.artisan
    })
    setImageFile(null)
    setImagePreview(product.image ? `${API_URL}/${product.image}` : '')
    setShowForm(true)
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('category', form.category)
      formData.append('stock', form.stock)
      formData.append('featured', form.featured)
      formData.append('artisan', form.artisan)
      if (imageFile) formData.append('image', imageFile)

      if (editProduct) {
        await api.put(`/api/products/${editProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Produit modifié !')
      } else {
        await api.post('/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Produit ajouté !')
      }

      setShowForm(false)
      setImageFile(null)
      setImagePreview('')
      fetchData()
    } catch (error) {
      alert('Erreur : ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return
    try {
      await api.delete(`/api/products/${id}`)
      setProducts(products.filter((p) => p._id !== id))
      alert('Produit supprimé !')
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/api/orders/${id}/status`, { status })
      setOrders(orders.map((o) =>
        o._id === id ? { ...o, status } : o
      ))
    } catch (error) {
      alert('Erreur lors de la mise à jour')
    }
  }

  // --- 3. FONCTION POUR DÉCLENCHER LE CLIC SUR L'INPUT CACHÉ ---
  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  const statusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const statusLabel = (status) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'confirmed': return 'Confirmée'
      case 'shipped': return 'Expédiée'
      case 'delivered': return 'Livrée'
      default: return status
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-semibold text-slate-900">
          Panel Admin
        </h1>
        <span className="text-sm text-slate-500">
          Bienvenue, {storedUser?.name}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-sable-200">
        <button
          onClick={() => setActiveTab('produits')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === 'produits'
              ? 'border-terracotta-500 text-terracotta-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Produits ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('commandes')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === 'commandes'
              ? 'border-terracotta-500 text-terracotta-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Commandes ({orders.length})
        </button>
      </div>

      {/* Formulaire Ajouter / Modifier */}
      {showForm && (
        <div className="bg-white border border-sable-200 rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">
            {editProduct ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-slate-500">Nom</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 rounded-lg border border-sable-200 px-3 py-2 text-sm"
                placeholder="Nom du produit"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full mt-1 rounded-lg border border-sable-200 px-3 py-2 text-sm"
              >
                <option value="Miroir">Miroir</option>
                <option value="Décoration">Décoration</option>
                <option value="Cuir">Cuir</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500">Prix (MAD)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full mt-1 rounded-lg border border-sable-200 px-3 py-2 text-sm"
                placeholder="350"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full mt-1 rounded-lg border border-sable-200 px-3 py-2 text-sm"
                placeholder="10"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full mt-1 rounded-lg border border-sable-200 px-3 py-2 text-sm"
                rows={3}
                placeholder="Description du produit..."
              />
            </div>

            {/* ── Champ image : STYLISATION ICI ── */}
            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">Image du produit</label>
              
              {/* Conteneur pour le bouton stylisé et l'aperçu */}
              <div className="mt-2 flex items-center gap-4">
                
                {/* --- 4. LE NOUVEAU BOUTON STYLISÉ (Utilise un LABEL pour déclencher le clic) --- */}
                <button
                  type="button"
                  onClick={handleChooseFileClick}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition duration-300
                    bg-white border-sable-300 text-slate-700 hover:border-terracotta-300 hover:text-terracotta-700 shadow-sm"
                >
                  <Upload className="w-4 h-4" /> {/* Icône moderne */}
                  {imageFile ? 'Changer l\'image' : 'Choisir une image'}
                </button>

                {/* --- 5. L'INPUT DE FICHIER RÉEL CACHÉ (Accessible via useRef) --- */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef} // Lien avec useRef
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      setImageFile(file)
                      setImagePreview(URL.createObjectURL(file))
                    }
                  }}
                  className="sr-only" // CLASSE TAILWIND POUR CACHER VISUELLEMENT (Screen Reader Only)
                />

                {/* Aperçu amélioré */}
                {imagePreview && (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="h-16 w-16 object-cover rounded-xl border border-sable-200 shadow-inner"
                    />
                    {/* Optionnel : Bouton pour enlever l'image (Plus propre) */}
                    <button
                        onClick={() => { setImageFile(null); setImagePreview(''); fileInputRef.current.value = ''; }}
                        className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-100 text-red-700 rounded-full opacity-0 group-hover:opacity-100 transition duration-150"
                        title="Enlever l'image"
                    >
                        &times;
                    </button>
                  </div>
                )}
                
                {/* Texte d'information si aucune image n'est choisie */}
                {!imageFile && !imagePreview && (
                    <span className="text-xs text-slate-400">Aucun fichier choisi</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="text-sm text-slate-600">
                Produit en vedette
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="btn-primary text-sm"
            >
              {editProduct ? 'Enregistrer' : 'Ajouter'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="btn-secondary text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Chargement...</p>
      ) : (
        <>
          {/* Produits Tab */}
          {activeTab === 'produits' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={handleOpenAdd}
                  className="btn-primary text-sm"
                >
                  + Ajouter un produit
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sable-200 text-left text-slate-500">
                      <th className="pb-3 pr-4">Image</th>
                      <th className="pb-3 pr-4">Produit</th>
                      <th className="pb-3 pr-4">Catégorie</th>
                      <th className="pb-3 pr-4">Prix</th>
                      <th className="pb-3 pr-4">Stock</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sable-200">
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="py-3 pr-4">
                          {product.image ? (
                            <img
                              src={`${API_URL}/${product.image}`}
                              alt={product.name}
                              className="h-10 w-10 object-cover rounded-lg border border-sable-200"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-sable-100 flex items-center justify-center text-slate-400 text-xs">
                              —
                            </div>
                          )}
                        </td>
                        <td className="py-3 pr-4 font-medium text-slate-900">
                          {product.name}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                          {product.category}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                          {product.price} MAD
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock > 5
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock} en stock
                          </span>
                        </td>
                        <td className="py-3 flex gap-3">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Commandes Tab */}
          {activeTab === 'commandes' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sable-200 text-left text-slate-500">
                    <th className="pb-3 pr-4">Client</th>
                    <th className="pb-3 pr-4">Total</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Statut</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sable-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-3 pr-4 font-medium text-slate-900">
                        {order.user?.name || 'Client'}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {order.totalPrice} MAD
                      </td>
                      <td className="py-3 pr-4 text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString('fr-MA')}
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                          {statusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          className="text-xs border border-sable-200 rounded px-2 py-1"
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmée</option>
                          <option value="shipped">Expédiée</option>
                          <option value="delivered">Livrée</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}