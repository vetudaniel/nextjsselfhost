'use client';

export default function ProtectedPage() {
  let safeKey = process.env.NEXT_PUBLIC_SAFE_KEY;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-500" />

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest uppercase text-emerald-400">Middleware</p>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-white">Geschützte Seite</h1>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Zugang gewährt
            </span>
          </div>
          <p className="text-zinc-500 text-sm">
            Du hast Zugriff auf diese Seite, weil das{' '}
            <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">protected=1</code>
            -Cookie gesetzt ist.
          </p>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Safe Key */}
        <div className="space-y-3">
          <h3 className="text-xs tracking-widest uppercase text-zinc-500">Öffentliche Umgebungsvariable</h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-4 flex items-center justify-between">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">NEXT_PUBLIC_SAFE_KEY</span>
            <code className="text-emerald-400 text-sm">{safeKey}</code>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Diese Umgebungsvariable wird mit dem Präfix{' '}
            <code className="text-cyan-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_</code>{' '}
            für den Browser verfügbar gemacht und ist daher im Client-Code zugänglich.
          </p>
        </div>

      </div>
    </main>
  );
}