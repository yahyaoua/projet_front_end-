import { Link } from 'react-router-dom'

export default function About() {
  const values = [
    {
      icon: '🎨',
      title: 'Créativité',
      text: "Chaque pièce est unique, conçue avec passion et imagination.",
    },
    {
      icon: '🤝',
      title: 'Authenticité',
      text: "Nous croyons que l'artisanat reflète l'identité et l'histoire du Maroc.",
    },
    {
      icon: '⭐',
      title: 'Qualité',
      text: 'Chaque produit est réalisé avec soin pour offrir durabilité et élégance.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Section 1 — Hero banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-amber-800 px-6 py-20 text-center shadow-card md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />
        <div className="relative">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
            À propos de nous
          </h1>
          <p className="mt-4 text-lg font-medium text-amber-100/95 md:text-xl">
            Artisanat authentique depuis Marrakech
          </p>
        </div>
      </section>

      {/* Section 2 — Our story */}
      <section className="mt-16 flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
        <div className="flex-1">
          <h2 className="font-heading text-2xl font-semibold text-slate-800 md:text-3xl">
            À propos de nous
          </h2>
          <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Artistique Machine est une boutique artisanale située à Marrakech,
              spécialisée dans la production et la vente de produits artisanaux
              uniques. Notre mission est de valoriser le savoir-faire des
              artisans en proposant des créations authentiques qui allient
              tradition et créativité.
            </p>
            <p>
              Nous concevons une variété de produits artisanaux tels que des
              miroirs décoratifs, des porte-clés, des objets de décoration et
              des articles en cuir. Chaque produit est réalisé avec soin afin
              d&apos;offrir qualité, originalité et durabilité.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-center md:w-48">
          <div className="h-32 w-32 rounded-full border-4 border-terracotta-500/30 bg-gradient-to-br from-sable-100 to-sable-200 shadow-card md:h-40 md:w-40" />
        </div>
      </section>

      {/* Section 3 — Our values */}
      <section className="mt-20">
        <h2 className="font-heading text-2xl font-semibold text-slate-800 md:text-3xl">
          Nos valeurs
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-sable-200 bg-white/90 p-6 shadow-card transition hover:border-terracotta-500/40 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sable-100 text-2xl">
                {item.icon}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-slate-800">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Our mission */}
      <section className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-terracotta-500/90 to-amber-700/90 px-6 py-12 text-white shadow-card md:px-10 md:py-16">
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">
          Notre Mission
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-amber-50/95 md:text-lg">
          Chez Artistique Machine, nous croyons que l&apos;artisanat est plus
          qu&apos;un simple produit : c&apos;est une expression culturelle et
          artistique qui reflète l&apos;identité et l&apos;histoire du Maroc.
          Notre objectif est de rendre l&apos;artisanat accessible à tous, tout
          en soutenant la créativité et le travail des artisans locaux.
        </p>
      </section>

      {/* Section 5 — Location */}
      <section className="mt-20">
        <h2 className="font-heading text-2xl font-semibold text-slate-800 md:text-3xl">
          Nous sommes à Marrakech 📍
        </h2>
        <p className="mt-2 text-slate-600">
          Venez nous rendre visite dans notre atelier au cœur de la ville rouge.
        </p>
        <div className="mt-6 max-w-md rounded-2xl border border-sable-200 bg-white/90 p-6 shadow-card">
          <p className="font-heading text-lg font-semibold text-terracotta-600">
            Artistique Machine
          </p>
          <p className="mt-1 text-slate-700">Marrakech, Maroc</p>
          <a
            href="mailto:contact@artistiquemachine.ma"
            className="mt-3 inline-block text-sm font-medium text-terracotta-600 underline decoration-terracotta-500/50 underline-offset-2 hover:text-terracotta-600"
          >
            contact@artistiquemachine.ma
          </a>
        </div>
      </section>

      {/* Section 6 — CTA */}
      <section className="mt-20 flex justify-center pb-8">
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full bg-terracotta-500 px-8 py-3.5 font-medium text-white shadow-card transition hover:bg-terracotta-600 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2"
        >
          Découvrir nos produits
        </Link>
      </section>
    </div>
  )
}
