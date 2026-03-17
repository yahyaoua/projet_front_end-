import { useEffect, useMemo, useState } from 'react'

const COLOR_OPTIONS = [
  'Naturel (bois)',
  'Noir',
  'Blanc',
  'Doré',
  'Argenté',
  'Marron',
  'Personnalisé',
]

function clampNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

export default function MiroirFormModal({ open, product, onClose, onSubmit }) {
  const [longueur, setLongueur] = useState('')
  const [largeur, setLargeur] = useState('')
  const [couleur, setCouleur] = useState('')
  const [notes, setNotes] = useState('')
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (!open) return
    setLongueur('')
    setLargeur('')
    setCouleur('')
    setNotes('')
    setTouched({})
  }, [open, product?.id])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const errors = useMemo(() => {
    const next = {}
    const l = clampNumber(longueur)
    const w = clampNumber(largeur)

    if (!Number.isFinite(l)) next.longueur = 'La longueur est obligatoire.'
    else if (l < 10 || l > 200)
      next.longueur = 'La longueur doit être entre 10 et 200 cm.'

    if (!Number.isFinite(w)) next.largeur = 'La largeur est obligatoire.'
    else if (w < 10 || w > 200)
      next.largeur = 'La largeur doit être entre 10 et 200 cm.'

    if (!String(couleur).trim()) next.couleur = 'Veuillez choisir une couleur.'

    return next
  }, [longueur, largeur, couleur])

  const isValid = Object.keys(errors).length === 0

  if (!open) return null

  const handleAdd = (e) => {
    e.preventDefault()
    const nextTouched = { longueur: true, largeur: true, couleur: true }
    setTouched((prev) => ({ ...prev, ...nextTouched }))
    if (!isValid) return
    onSubmit?.({
      longueur: clampNumber(longueur),
      largeur: clampNumber(largeur),
      couleur: String(couleur).trim(),
      notes: notes?.trim() || '',
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Personnalisez votre miroir"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Fermer"
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-sable-200 bg-white shadow-card">
        <div className="bg-gradient-to-r from-sable-100 to-white px-6 py-5">
          <h2 className="font-heading text-2xl font-semibold text-slate-900">
            Personnalisez votre miroir
          </h2>
          <p className="mt-1 text-sm font-medium text-terracotta-600">
            {product?.name}
          </p>
        </div>

        <form onSubmit={handleAdd} className="space-y-5 px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Longueur (cm)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={10}
                max={200}
                placeholder="Ex: 60"
                value={longueur}
                onChange={(e) => setLongueur(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, longueur: true }))}
                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  touched.longueur && errors.longueur
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-500/20'
                    : 'border-sable-200 focus:border-terracotta-500 focus:ring-terracotta-500/30'
                }`}
                required
              />
              {touched.longueur && errors.longueur && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.longueur}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Largeur (cm)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={10}
                max={200}
                placeholder="Ex: 40"
                value={largeur}
                onChange={(e) => setLargeur(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, largeur: true }))}
                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  touched.largeur && errors.largeur
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-500/20'
                    : 'border-sable-200 focus:border-terracotta-500 focus:ring-terracotta-500/30'
                }`}
                required
              />
              {touched.largeur && errors.largeur && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.largeur}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Couleur du cadre
            </label>
            <select
              value={couleur}
              onChange={(e) => setCouleur(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, couleur: true }))}
              className={`mt-2 w-full rounded-2xl border bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 ${
                touched.couleur && errors.couleur
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-500/20'
                  : 'border-sable-200 focus:border-terracotta-500 focus:ring-terracotta-500/30'
              }`}
              required
            >
              <option value="" disabled>
                Sélectionner une couleur
              </option>
              {COLOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {touched.couleur && errors.couleur && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.couleur}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Notes supplémentaires (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Autres détails ou demandes spéciales..."
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-sable-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/30"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
            <button type="button" onClick={onClose} className="btn-secondary">
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              Ajouter au panier
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

