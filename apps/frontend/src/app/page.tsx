import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">
          Fase 1 - MVP
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
          Portal do Leitor
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
          Pesquisa o acervo corporativo, veja disponibilidade de exemplares e acompanhe seus empréstimos.
        </p>
        <div className="mt-8">
          <Link href="/search" className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700">
            Ir para pesquisa
          </Link>
        </div>
      </section>
    </main>
  );
}
