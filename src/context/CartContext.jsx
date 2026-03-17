import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

function normalizeMiroirOptions(options) {
  if (!options) return null
  const longueur = Number(options.longueur)
  const largeur = Number(options.largeur)
  const couleur = String(options.couleur || '').trim()
  const notes = typeof options.notes === 'string' ? options.notes.trim() : ''
  return {
    longueur,
    largeur,
    couleur,
    notes,
  }
}

function buildLineId(product, options) {
  if (!options) return `product:${product.id}`
  const o = normalizeMiroirOptions(options)
  return `product:${product.id}|${o.longueur}x${o.largeur}|${o.couleur}|${o.notes}`
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (product, options) => {
    setItems((prev) => {
      const lineId = buildLineId(product, options)
      const existing = prev.find((item) => item.lineId === lineId)
      if (existing) {
        return prev.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      const customOptions = options ? normalizeMiroirOptions(options) : null
      return [
        ...prev,
        {
          ...product,
          lineId,
          customOptions,
          quantity: 1,
        },
      ]
    })
  }

  const removeItem = (lineId) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId))
  }

  const updateQuantity = (lineId, quantity) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setItems([])

  const { total, itemCount } = useMemo(() => {
    const totalValue = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    const countValue = items.reduce((sum, item) => sum + item.quantity, 0)
    return { total: totalValue, itemCount: countValue }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount,
    }),
    [items, total, itemCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return ctx
}

