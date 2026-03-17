import { useEffect, useState } from 'react'
import { getFeaturedProducts, getProducts } from '../services/productService'

export function useProducts(initialFilters = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getProducts(filters)
        if (isMounted) setProducts(data)
      } catch (err) {
        if (isMounted) setError(err.message || 'Erreur lors du chargement')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [filters])

  return { products, loading, error, filters, setFilters }
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getFeaturedProducts()
        if (isMounted) setProducts(data)
      } catch (err) {
        if (isMounted) setError(err.message || 'Erreur lors du chargement')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  return { products, loading, error }
}

