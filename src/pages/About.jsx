import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, MapPin, Mail, Target } from 'lucide-react'; 
import heroBgImage from '../assets/products/image2.png'; 

export default function About() {
  const values = [
    {
      icon: <Sparkles className="h-8 w-8 text-terracotta-500" />,
      title: 'Créativité',
      text: "Mêlant design moderne et inspiration artisanale pour des pièces décoratives uniques.",
    },
    {
      icon: <Heart className="h-8 w-8 text-terracotta-500" />,
      title: 'Authenticité',
      text: "Préservant l’âme et l’histoire de l’artisanat traditionnel marocain dans chaque création.",
    },
    {
      icon: <Award className="h-8 w-8 text-terracotta-500" />,
      title: 'Qualité',
      text: 'Des matériaux nobles sélectionnés et un soin méticuleux pour une durabilité élégante.',
    },
  ];

  const mapCenterParams = "!1m14!1m8!1m3!1d3397.0270412856184!2d-7.9721111!3d31.5499444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMyJzU5LjgiTiA3wrA1OCcxOS42Ilc!5e0!3m2!1sfr!2sma";

  return (
    <div className="min-h-screen bg-slate-50"> 

      {/* 1. HERO SECTION */}
      <section
        className="relative overflow-hidden px-6 py-28 text-center shadow-2xl md:py-36 rounded-b-[40px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        {/* Overlay subtil pour garantir la lisibilité du texte blanc sans flouter l'image */}
        <div className="absolute inset-0 bg-black/20 z-0" />
        
        <div className="relative max-w-5xl mx-auto z-10">
          <h1 className="font-heading text-5xl font-extrabold tracking-tighter text-white md:text-7xl lg:text-8xl">
            L'Artisanat sublimé
          </h1>
          <p className="mt-6 text-xl font-medium text-white md:text-2xl max-w-3xl mx-auto">
            Bienvenue chez <span className="font-bold text-white">Artistique Machine</span>, là où la tradition marocaine rencontre le design contemporain pour des pièces d'exception, façonnées à Marrakech.
          </p>
          <div className="mt-12">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 font-bold text-terracotta-600 shadow-lg transition hover:bg-slate-100 hover:-translate-y-1"
            >
              Découvrir nos créations
            </Link>
          </div>
        </div>
        {/* L'ERREUR ÉTAIT ICI : UN </div> EN TROP A ÉTÉ SUPPRIMÉ */}
      </section>

      {/* 2. NOTRE HISTOIRE */}
      <section className="mt-24 px-6 md:mt-32">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-20">
          <div className="flex-1 space-y-6">
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 md:text-4xl">
              De l'Atelier à votre Intérieur
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
              <p>
                C'est au cœur de l'effervescence de Marrakech qu'**Artistique Machine** puise son inspiration. Notre passion pour l’art et le design nous conduit à concevoir des objets uniques, véritables hymnes à la beauté du fait-main.
              </p>
              <p>
                Nous créons principalement des <span className="font-semibold text-terracotta-600">miroirs décoratifs envoûtants</span>, des <span className="font-semibold text-terracotta-600">articles en cuir raffinés</span> et des <span className="font-semibold text-terracotta-600">objets d'art</span> qui racontent une histoire.
              </p>
            </div>
          </div>

          <div className="w-full max-w-md md:max-w-xs md:shrink-0">
            <div className="aspect-square rounded-full border-[10px] border-terracotta-100 bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl flex items-center justify-center relative">
              <Sparkles className="h-16 w-16 text-terracotta-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOS VALEURS */}
      <section className="mt-28 px-6 md:mt-36">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl font-extrabold text-slate-900 md:text-4xl text-center">
            Ce qui nous définit
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {values.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl transition hover:border-terracotta-200 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-terracotta-50 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NOTRE MISSION */}
      <section className="mt-28 px-6 md:mt-36">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-[30px] bg-white shadow-2xl flex flex-col md:flex-row border border-slate-100">
          <div className="flex-1 px-8 py-12 md:p-16 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-500 text-white shadow-lg">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-slate-900 md:text-4xl">
                Notre Engagement
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
              Notre mission est de valoriser l’artisanat marocain en proposant des créations à la fois modernes et authentiques. Nous soutenons activement les talents locaux pour préserver le riche patrimoine culturel de Marrakech.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-terracotta-500 flex items-center justify-center py-10">
            <Award className="h-24 w-24 text-white/50" />
          </div>
        </div>
      </section>

      {/* 5. LOCALISATION */}
      <section className="mt-28 px-6 pb-24 md:mt-36">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 space-y-3">
            <div className="inline-flex gap-2 items-center rounded-full bg-terracotta-100 px-4 py-1.5 text-sm font-semibold text-terracotta-700 border border-terracotta-200">
              <MapPin className="w-4 h-4" />
              Retrouvez-nous
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 md:text-4xl">
              Nous sommes à Marrakech 
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <p className="font-heading text-xl font-bold text-terracotta-600 flex gap-2 items-center">
                  <Sparkles className='w-5 h-5'/>
                  Artistique Machine
                </p>
                <p className="text-slate-800 text-lg">Marrakech, Maroc</p>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className='font-semibold'>Latitude :</span> 31°32'59.8"N <br />
                  <span className='font-semibold'>Longitude :</span> 7°58'19.6"W
                </p>
              </div>

              <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
                <a href="mailto:contact@artistiquemachine.com" className="flex gap-2.5 items-center text-slate-700 hover:text-terracotta-500 transition group">
                  <Mail className="w-5 h-5 text-terracotta-400" />
                  contact@artistiquemachine.com
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex gap-2.5 items-center text-sm font-semibold text-terracotta-600 hover:text-terracotta-500 transition">
                  <MapPin className="w-5 h-5 text-terracotta-400" />
                  Voir sur Google Maps →
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-xl md:col-span-2 relative h-[350px] md:h-full">
              <iframe
                title="map"
                src={`https://www.google.com/maps/embed?pb=${mapCenterParams}`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}