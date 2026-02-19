import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

async function fetchData(id: number) {
  await new Promise((resolve) => setTimeout(resolve, id * 1000));
  return `Daten nach ${id} Sekunde${id > 1 ? 'n' : ''} geladen`;
}

async function AsyncDataComponent({ id }: { id: number }) {
  const data = await fetchData(id);
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-widest uppercase text-zinc-500">Inhalt {id}</p>
        <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Geladen
        </span>
      </div>
      <p className="text-sm text-zinc-300">{data}</p>
    </div>
  );
}

function LoadingCard({ id }: { id: number }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 space-y-1 animate-pulse">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-widest uppercase text-zinc-500">Inhalt {id}</p>
        <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
          Lädt...
        </span>
      </div>
      <div className="h-4 bg-zinc-800 rounded w-48" />
    </div>
  );
}

export default function Streaming() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-500" />

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest uppercase text-emerald-400">Server Components</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Streaming Demo</h1>
          <p className="text-zinc-500 text-sm">
            Jede Karte wird einzeln gestreamt — Inhalte erscheinen sobald sie bereit sind, ohne die gesamte Seite zu blockieren.
          </p>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Streaming Cards */}
        <div className="space-y-3">
          <Suspense fallback={<LoadingCard id={1} />}>
            <AsyncDataComponent id={1} />
            <Suspense fallback={<LoadingCard id={2} />}>
              <AsyncDataComponent id={2} />
              <Suspense fallback={<LoadingCard id={3} />}>
                <AsyncDataComponent id={3} />
                <Suspense fallback={<LoadingCard id={4} />}>
                  <AsyncDataComponent id={4} />
                  <Suspense fallback={<LoadingCard id={5} />}>
                    <AsyncDataComponent id={5} />
                  </Suspense>
                </Suspense>
              </Suspense>
            </Suspense>
          </Suspense>
        </div>

      </div>
    </main>
  );
}