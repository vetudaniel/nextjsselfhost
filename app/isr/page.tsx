import { revalidatePath } from 'next/cache';
import { FreshnessTimer } from './timer';
import { FreshnessBadge } from "./FreshnessBadge"

async function revalidateAction() {
  'use server';
  revalidatePath('/isr');
}

async function getPokemon() {
  const randomId = Math.floor(Math.random() * 151) + 1;
  const res = await fetch(`https://api.vercel.app/pokemon/${randomId}`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function ISRDemo() {
  const pokemon = await getPokemon();
  const generatedAt = Date.now();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-500" />

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest uppercase text-emerald-400">Caching</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">ISR Demo</h1>
          <p className="text-zinc-500 text-sm">
            Diese Seite wird alle <span className="text-cyan-400">10 Sekunden</span> neu validiert. Daten werden aus dem Cache geliefert bis sie veraltet sind.
          </p>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Pokemon Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-widest uppercase text-zinc-500">Aktuelles Pokémon</p>
            <div className="flex items-center gap-2">
              <FreshnessBadge generatedAt={generatedAt} revalidateSeconds={10} />
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </div>
          </div>

          <p className="text-3xl font-bold text-white capitalize">{pokemon.name}</p>

          <div className="flex gap-2 flex-wrap">
            {pokemon.type.map((t: string) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-emerald-400 capitalize"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Freshness Timer */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-2">
          <p className="text-xs tracking-widest uppercase text-zinc-500">Seitenaktualität</p>
          <FreshnessTimer generatedAt={generatedAt} />
        </div>

        {/* Revalidate */}
        <div className="space-y-3">
          <p className="text-zinc-500 text-sm">
            Erzwinge eine Neuvalidierung, um sofort ein neues Pokémon zu laden.
          </p>
          <form action={revalidateAction}>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Jetzt neu validieren →
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}