import { addTodoAction, deleteTodoAction } from './actions';
import { db } from './drizzle';
import { todos } from './schema';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let todoList = await db.select().from(todos).orderBy(todos.createdAt);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-500" />

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest uppercase text-emerald-400">Datenbank</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Aufgabenliste</h1>
          <p className="text-zinc-500 text-sm">
            Einträge werden in einer <span className="text-cyan-400">Postgres</span>-Datenbank gespeichert.
          </p>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Add Todo Form */}
        <form action={addTodoAction} className="flex gap-3">
          <input
            type="text"
            name="content"
            required
            placeholder="Neue Aufgabe eingeben..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
          >
            Hinzufügen →
          </button>
        </form>

        {/* Todo List */}
        {todoList.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-10 text-center">
            <p className="text-zinc-600 text-sm">Noch keine Aufgaben vorhanden.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todoList.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-3 group"
              >
                <span className="text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {todo.content}
                </span>
                <form action={deleteTodoAction}>
                  <input type="hidden" value={todo.id} name="id" />
                  <button
                    type="submit"
                    className="text-xs text-zinc-600 hover:text-red-400 border border-transparent hover:border-red-900 hover:bg-red-950 px-2.5 py-1 rounded-md transition-all cursor-pointer"
                  >
                    Löschen
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        {/* Count */}
        {todoList.length > 0 && (
          <p className="text-xs text-zinc-600 text-right">
            {todoList.length} {todoList.length === 1 ? 'Aufgabe' : 'Aufgaben'} gesamt
          </p>
        )}

      </div>
    </main>
  );
}