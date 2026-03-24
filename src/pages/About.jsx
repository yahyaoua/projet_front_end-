import { Link } from 'react-router-dom'

export default function About() {

  const values = [
    {
      icon: '🎨',
      title: 'Créativité',
      text: "Chaque création est pensée comme une œuvre unique, mêlant design moderne et inspiration artisanale.",
    },
    {
      icon: '🕌',
      title: 'Authenticité',
      text: "Nous valorisons le savoir-faire marocain en préservant l’âme et l’histoire de l’artisanat traditionnel.",
    },
    {
      icon: '✨',
      title: 'Qualité',
      text: 'Nous sélectionnons des matériaux nobles et travaillons chaque détail pour garantir durabilité et élégance.',
    },
  ]

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-amber-800 px-6 py-20 text-center shadow-card md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />
        
        <div className="relative">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Artistique Machine
          </h1>
          <p className="mt-4 text-lg font-medium text-amber-100 md:text-xl">
            L’art de la décoration artisanale à Marrakech
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="mt-16 flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
        
        <div className="flex-1">
          <h2 className="font-heading text-2xl font-semibold text-slate-800 md:text-3xl">
            Notre histoire
          </h2>

          <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Basée à Marrakech, Artistique Machine est une entreprise spécialisée dans
              la création de pièces décoratives artisanales. Notre passion pour l’art et
              le design nous pousse à concevoir des objets uniques qui subliment les espaces de vie.
            </p>

            <p>
              Nous réalisons principalement des miroirs décoratifs, des articles en cuir
              et des objets artistiques inspirés de la culture marocaine. Chaque pièce est
              le fruit d’un travail minutieux combinant tradition et innovation.
            </p>

            <p>
              À travers nos créations, nous souhaitons offrir bien plus que des produits :
              une véritable expérience esthétique et culturelle.
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="flex shrink-0 items-center justify-center md:w-64">
          <div className="h-40 w-40 rounded-full border-4 border-terracotta-500/30 bg-gradient-to-br from-sable-100 to-sable-200 shadow-card md:h-52 md:w-52 flex items-center justify-center text-4xl">
            🪞
          </div>
        </div>
      </section>

      {/* VALUES */}
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

      {/* MISSION */}
      <section className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-terracotta-500/90 to-amber-700/90 px-6 py-12 text-white shadow-card md:px-10 md:py-16">
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">
          Notre mission
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-amber-50 md:text-lg">
          Notre mission est de valoriser l’artisanat marocain en proposant des créations
          modernes et authentiques. Nous souhaitons rendre la décoration artistique accessible
          à tous, tout en soutenant les talents locaux et en préservant le patrimoine culturel.
        </p>
      </section>

      {/* LOCALISATION */}
      <section className="mt-20">
        <h2 className="font-heading text-2xl font-semibold text-slate-800 md:text-3xl">
          Nous sommes à Marrakech 📍
        </h2>

        <p className="mt-2 text-slate-600">
          Retrouvez-nous facilement grâce à nos coordonnées géographiques précises.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          
          {/* INFO */}
          <div className="rounded-2xl border border-sable-200 bg-white/90 p-6 shadow-card">
            
            <p className="font-heading text-lg font-semibold text-terracotta-600">
              Artistique Machine
            </p>

            <p className="mt-1 text-slate-700">
              Marrakech, Maroc
            </p>

            <p className="mt-2 text-sm text-slate-600">
              📍 Latitude : 31°32'59.8"N <br />
              📍 Longitude : 7°58'19.6"W
            </p>

            <a
              href="https://www.google.com/maps?q=31.54994,-7.97211"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-terracotta-600 underline underline-offset-2 hover:text-terracotta-500"
            >
              Voir sur Google Maps
            </a>

            <a
              href="mailto:contact@artistiquemachine.com"
              className="block mt-3 text-sm text-slate-600 hover:text-terracotta-500"
            >
              contact@artistiquemachine.com
            </a>

          </div>

          {/* MAP */}
          <div className="overflow-hidden rounded-2xl border border-sable-200 shadow-card">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=31.54994,-7.97211&z=15&output=embed"
              className="w-full h-[300px] border-0"
              loading="lazy"
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 flex justify-center pb-8">
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full bg-terracotta-500 px-8 py-3.5 font-medium text-white shadow-card transition hover:bg-terracotta-600"
        >
          Découvrir nos produits
        </Link>
      </section>

    </div>
  )
}