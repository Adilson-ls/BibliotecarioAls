import ReaderSearchPortal from '@/components/ReaderSearchPortal';

export default function SearchPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Portal do Leitor</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Pesquisa de acervo</h1>
          <p className="mt-3 text-slate-600">Pesquise por título, autor ou ISBN e veja os resultados imediatamente.</p>
        </div>
        <ReaderSearchPortal />
      </div>
    </main>
  );
}
