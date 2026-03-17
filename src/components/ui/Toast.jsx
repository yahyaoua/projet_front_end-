import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  const colorClasses =
    type === 'error'
      ? 'border-red-300 bg-red-50 text-red-800'
      : 'border-menthe-500/60 bg-menthe-500/10 text-menthe-600'

  return (
    <div className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div
        className={`card-sable max-w-md w-full border-l-4 ${colorClasses} flex items-start gap-3 px-4 py-3 shadow-lg`}
      >
        <div className="mt-0.5 h-2 w-2 rounded-full bg-current" />
        <p className="text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-xs font-medium text-slate-500 hover:text-slate-700"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}

