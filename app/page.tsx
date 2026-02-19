import Image from 'next/image';
import { connection } from 'next/server';


async function getPokemon() {
  await connection();

  let apiKey = global.secrets.apiKey || 'None for demo';
  let randomNumber = Math.floor(Math.random() * 100) + 1;

  return await fetch(`https://api.vercel.app/pokemon/${randomNumber}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }).then((r) => r.json());
}

export default async function Home() {
  let secretKey = process.env.SECRET_KEY;
  let pokemon = await getPokemon();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-500" />

      <section className="max-w-2xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <div className="space-y-3">
          <p className="text-xs tracking-widest uppercase text-emerald-400">
            Selbst gehostet
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Next.js Demo
          </h1>
          <p className="text-zinc-400 leading-relaxed text-sm">
            Eine Demo einer Next.js-Anwendung, gehostet auf Ubuntu Linux, mit einer
            Postgres-Datenbank und einem Nginx-Proxy.{' '}
            <a
              href="https://github.com/vetudaniel/nextjsselfhost"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
            >
              Code ansehen ↗
            </a>
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800" />

        {/* Datenabruf */}
        <div className="space-y-3">
          <h3 className="text-xs tracking-widest uppercase text-zinc-500">
            Datenabruf
          </h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 text-sm">
              Zufälliges Pokémon:{' '}
              <span className="text-white font-semibold capitalize">{pokemon.name}</span>
            </span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Abgerufen via <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">fetch</code> von einer externen API. Diese Seite wird dynamisch ausgeliefert — neu laden für ein neues Pokémon.
          </p>
        </div>

        {/* Bildoptimierung */}
        <div className="space-y-4">
          <h3 className="text-xs tracking-widest uppercase text-zinc-500">
            Bildoptimierung
          </h3>
          <div className="rounded-xl overflow-hidden border border-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1771308457227-efd671c6c347"
              width={480}
              height={320}
              alt="Programmieren"
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Next.js unterstützt Bildoptimierung direkt mit{' '}
            <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">next start</code>.
            Ab Next.js 15 ist <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">sharp</code> nicht mehr manuell erforderlich.
            Ein eigener{' '}
            <a href="https://github.com/leerob/next-self-host/blob/main/image-loader.ts" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors">
              Bild-Loader
            </a>
            {' '}kann über{' '}
            <a href="https://github.com/leerob/next-self-host/blob/main/next.config.ts" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors">
              <code className="text-xs">next.config.ts</code>
            </a>{' '}eingebunden werden.{' '}
            <a href="https://nextjs.org/docs/app/building-your-application/deploying#image-optimization" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors">
              Dokumentation ↗
            </a>
          </p>
        </div>

        {/* Feature Grid */}
        {[
          {
            label: 'Streaming',
            description: (
              <>
                Der App Router unterstützt Streaming via{' '}
                <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">Suspense</code> und asynchrone Komponenten.
                Nginx übernimmt die Komprimierung; Proxy-Pufferung ist deaktiviert, um gestreamte Antworten zu ermöglichen.
              </>
            ),
            demoHref: '/streaming',
            docsHref: 'https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming',
          },
          {
            label: 'Postgres-Datenbank',
            description: (
              <>
                Liest und schreibt in einen Postgres-Container via Drizzle ORM. Ein Cron-Job setzt die Demo-Daten alle 10 Minuten zurück. Manuell auslösbar via{' '}
                <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">POST /db/clear</code>.
              </>
            ),
            demoHref: '/db',
          },
          {
            label: 'ISR / Caching',
            description: (
              <>
                Verwendet standardmäßig einen <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">lru-cache</code> im Arbeitsspeicher.
                Diese Demo-Route nutzt eine <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">revalidate</code>-Zeit von 10 Sekunden.
                Für Multi-Container-Setups wird Redis empfohlen.
              </>
            ),
            demoHref: '/isr',
            docsHref: 'https://nextjs.org/docs/app/building-your-application/deploying#caching-and-isr',
          },
          {
            label: 'Middleware',
            description: (
              <>
                Die Route <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">/protected</code> erfordert ein{' '}
                <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">protected=1</code>-Cookie.
                Middleware läuft vor allen Routen — keine DB-Abfragen darin; stattdessen Auth-Cookie-Prüfungen bevorzugen.
              </>
            ),
            demoHref: '/protected',
            docsHref: 'https://nextjs.org/docs/app/building-your-application/deploying#middleware',
          },
        ].map(({ label, description, demoHref, docsHref }) => (
          <div key={label} className="space-y-3">
            <h3 className="text-xs tracking-widest uppercase text-zinc-500">{label}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
            <div className="flex gap-3 flex-wrap">
              {demoHref && (
                <a
                  href={demoHref}
                  className="text-xs px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-all"
                >
                  Demo ansehen →
                </a>
              )}
              {docsHref && (
                <a
                  href={docsHref}
                  className="text-xs px-3 py-1.5 rounded-md text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Dokumentation ↗
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Serverstart */}
        {/*         <div className="space-y-3">
          <h3 className="text-xs tracking-widest uppercase text-zinc-500">Serverstart</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Die <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">instrumentation</code>-Datei führt Code beim Serverstart aus — stabilisiert in Next.js 15. Typischer Anwendungsfall: Geheimnisse aus Vault oder 1Password laden.{' '}
            <a href="https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors">
              Dokumentation ↗
            </a>
          </p>
        </div> */}

        {/* Umgebungsvariablen */}
        {/*         <div className="space-y-3">
          <h3 className="text-xs tracking-widest uppercase text-zinc-500">Umgebungsvariablen</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Next.js lädt Umgebungsvariablen aus <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">.env</code>-Dateien.
            Server-Komponenten lesen sie bei jeder Anfrage dynamisch — nützlich für umgebungsspezifische Docker-Images.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-4 flex items-center justify-between">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">SECRET_KEY</span>
            <code className="text-emerald-400 text-sm">{secretKey}</code>
          </div>
          <a href="https://nextjs.org/docs/app/building-your-application/deploying#environment-variables" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            Dokumentation ↗
          </a>
        </div> */}

        {/* Footer */}
        <div className="border-t border-zinc-800 pt-8 text-xs text-zinc-600 text-center">
          Next.js Self-Hosted Demo · Mit ♥ gebaut
        </div>
      </section>
    </main>
  );
}