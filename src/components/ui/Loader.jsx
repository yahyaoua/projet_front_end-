export default function Loader({ label = 'Chargement...' }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-5 py-2 shadow-card border border-sable-200/80">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-terracotta-500 border-t-transparent" />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
    </div>
  )
}

