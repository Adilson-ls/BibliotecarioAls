'use client';

import { useEffect, useMemo, useState } from 'react';

type Work = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  year?: number;
};

export default function ReaderSearchPortal() {
  const [query, setQuery] = useState('');
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const searchParam = query.trim() ? `?search=${encodeURIComponent(query.trim())}` : '';
        const response = await fetch(`/api/works${searchParam}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Falha ao carregar o acervo.');
        }

        const data = await response.json();
        setWorks(data);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        setError('Não foi possível buscar o acervo no servidor.');
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const statusMessage = useMemo(() => {
    if (error) {
      return error;
    }
    if (isLoading) {
      return 'Buscando obras...';
    }
    if (works.length === 0) {
      return 'Nenhuma obra encontrada para esta busca.';
    }
    return null;
  }, [error, isLoading, works.length]);

  return (
    <section className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className="flex flex-col gap-3">
          <span className="font-medium text-slate-700">Buscar obra</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Título, autor ou ISBN"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Título</th>
              <th className="px-4 py-3 text-left font-semibold">Autor</th>
              <th className="px-4 py-3 text-left font-semibold">ISBN</th>
              <th className="px-4 py-3 text-left font-semibold">Editora</th>
              <th className="px-4 py-3 text-left font-semibold">Ano</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {works.map((work) => (
              <tr key={work.id} className="hover:bg-white">
                <td className="px-4 py-4 font-medium text-slate-900">{work.title}</td>
                <td className="px-4 py-4">{work.author}</td>
                <td className="px-4 py-4">{work.isbn}</td>
                <td className="px-4 py-4">{work.publisher ?? '—'}</td>
                <td className="px-4 py-4">{work.year ?? '—'}</td>
              </tr>
            ))}
            {statusMessage && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  {statusMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
