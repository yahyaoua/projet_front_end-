import api from './api'
import miroir1 from '../assets/products/miroir1.png'
import miroir2 from '../assets/products/miroir2.png'
import miroir3 from '../assets/products/miroir3.png'
import miroir4 from '../assets/products/miroir4.png'
import miroir5 from '../assets/products/miroir5.png'
import miroir6 from '../assets/products/miroir6.png'
import miroir7 from '../assets/products/miroir7.png'
import miroir8 from '../assets/products/miroir8.png'

export const mockProducts = [
  {
    id: 1,
    name: 'Miroir Atlas',
    artisan: 'Artistique Machine',
    price: 350,
    category: 'Miroir',
    image: miroir1,
    description:
      'Miroir artisanal au cadre sculpté à la main. Une pièce élégante pour décorer votre intérieur.',
    stock: 5,
    featured: true,
  },
  {
    id: 2,
    name: 'Miroir Soleil',
    artisan: 'Artistique Machine',
    price: 290,
    category: 'Miroir',
    image: miroir2,
    description:
      'Miroir décoratif inspiré du soleil. Idéal pour apporter lumière et style à votre espace.',
    stock: 4,
    featured: true,
  },
  {
    id: 3,
    name: 'Miroir Berbère',
    artisan: 'Artistique Machine',
    price: 320,
    category: 'Miroir',
    image: miroir3,
    description:
      'Miroir artisanal avec motifs berbères traditionnels. Parfait pour une décoration authentique.',
    stock: 3,
    featured: true,
  },
  {
    id: 4,
    name: 'Porte-clés Cuir Classique',
    artisan: 'Artistique Machine',
    price: 45,
    category: 'Cuir',
    image: miroir4,
    description:
      'Porte-clés simple et élégant en cuir véritable. Résistant et pratique au quotidien.',
    stock: 20,
    featured: false,
  },
  {
    id: 5,
    name: 'Porte-clés Artisan',
    artisan: 'Artistique Machine',
    price: 55,
    category: 'Cuir',
    image: miroir5,
    description:
      'Porte-clés fabriqué à la main avec un style traditionnel marocain.',
    stock: 15,
    featured: false,
  },
  {
    id: 6,
    name: 'Porte-clés Nomade',
    artisan: 'Artistique Machine',
    price: 50,
    category: 'Cuir',
    image: produit6,
    description:
      'Accessoire artisanal inspiré de la culture nomade. Léger et original.',
    stock: 12,
    featured: false,
  },
  {
    id: 7,
    name: 'Décoration Murale Artisanale',
    artisan: 'Artistique Machine',
    price: 180,
    category: 'Décoration',
    image: miroir7,
    description:
      'Décoration murale faite à la main pour donner une touche artistique à votre maison.',
    stock: 7,
    featured: true,
  },
  {
    id: 8,
    name: 'Boîte Décorative',
    artisan: 'Artistique Machine',
    price: 120,
    category: 'Décoration',
    image: miroir8,
    description:
      'Boîte artisanale élégante pour ranger vos petits objets avec style.',
    stock: 9,
    featured: false,
  },
  {
    id: 9,
    name: 'Sac en Cuir Tradition',
    artisan: 'Artistique Machine',
    price: 450,
    category: 'Cuir',
    image: miroir8,
    description:
      'Sac en cuir artisanal, pratique et durable pour un usage quotidien.',
    stock: 6,
    featured: true,
  },
  {
    id: 10,
    name: 'Portefeuille en Cuir',
    artisan: 'Artistique Machine',
    price: 150,
    category: 'Cuir',
    image: miroir8,
    description:
      'Portefeuille en cuir fait à la main, compact et élégant.',
    stock: 11,
    featured: false,
  },
]

const USE_MOCK = true

export async function getProducts(filters = {}) {
  if (USE_MOCK) {
    const { search, category } = filters
    let data = [...mockProducts]
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.artisan.toLowerCase().includes(q),
      )
    }
    if (category && category !== 'Tous') {
      data = data.filter((p) => p.category === category)
    }
    return data
  }
  const response = await api.get('/api/products', { params: filters })
  return response.data
}

export async function getProductById(id) {
  if (USE_MOCK) {
    return mockProducts.find((p) => p.id === Number(id))
  }
  const response = await api.get(`/api/products/${id}`)
  return response.data
}

export async function getFeaturedProducts() {
  if (USE_MOCK) {
    return mockProducts.filter((p) => p.featured)
  }
  const response = await api.get('/api/products', { params: { featured: true } })
  return response.data
}
