import { useCartContext } from '../../context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartContext()

  const dims =
    item?.customOptions?.longueur && item?.customOptions?.largeur
      ? `${item.customOptions.longueur} x ${item.customOptions.largeur} cm`
      : null
  const couleur = item?.customOptions?.couleur || null

  return (
    <div className="flex gap-4 rounded-2xl border border-sable-200 bg-white/80 p-3 shadow-sm">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-sable-200">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-sm font-semibold text-slate-900">
              {item.name}
            </p>
            {(dims || couleur) && (
              <div className="mt-1 space-y-0.5 text-xs text-slate-600">
                {dims && <p>📐 Dimensions: {dims}</p>}
                {couleur && <p>🎨 Couleur: {couleur}</p>}
              </div>
            )}
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {item.artisan}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.lineId ?? item.id)}
            className="text-xs font-medium text-slate-400 hover:text-terracotta-600"
          >
            Retirer
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-terracotta-600">
            {(item.price * item.quantity).toLocaleString('fr-MA')} MAD
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-sable-200 bg-sable-100 px-2 py-1">
            <button
              type="button"
              onClick={() =>
                updateQuantity(item.lineId ?? item.id, item.quantity - 1)
              }
              className="h-6 w-6 rounded-full bg-white text-sm font-semibold text-slate-700 hover:bg-sable-200"
            >
              -
            </button>
            <span className="w-6 text-center text-xs font-medium">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                updateQuantity(item.lineId ?? item.id, item.quantity + 1)
              }
              className="h-6 w-6 rounded-full bg-menthe-500 text-sm font-semibold text-white hover:bg-menthe-600"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-[11px] text-slate-400">
          {item.stock > 0
            ? `${item.stock} pièces en stock`
            : 'Bientôt de retour'}
        </p>
      </div>
    </div>
  )
}

