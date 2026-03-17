export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sable-200/80 bg-sable-100/80">
      <div className="container-page flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg text-slate-900">
            Artistique Machine
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Sélection d&apos;objets uniques créés à la main par des artisans marocains.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Artistique Machine</span>
          <span className="hidden h-1 w-1 rounded-full bg-ocre-500 md:inline-block" />
          <span>Fait avec passion à Marrakech, Fès et au-delà.</span>
        </div>
      </div>
    </footer>
  )
}

