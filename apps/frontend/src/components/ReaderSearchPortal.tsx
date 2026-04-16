'use client';

import { useMemo, useState } from 'react';

type Work = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  availableCopies: number;
};

const sampleWorks: Work[] = [
  { id: '1', title: 'Governança de TI', author: 'Maria Almeida', isbn: '9788571234567', availableCopies: 2 },
  { id: '2', title: 'Design de Sistemas Corporativos', author: 'Fernando Souza', isbn: '9788571234568', availableCopies: 1 },
  { id: '3', title: 'Compliance e Proteção de Dados', author: 'Ana Ribeiro', isbn: '9788571234569', availableCopies: 3 }
];

export default function ReaderSearchPortal() {
  const [query, setQuery] = useState('');

  const filteredWorks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return sampleWorks;
    }

    return sampleWorks.filter((work) =>
      [work.title, work.author, work.isbn].some((field) => field.toLowerCase().includes(normalized))
    );
  }, [query]);

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
              <th className="px-4 py-3 text-left font-semibold">Disponível</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredWorks.map((work) => (
              <tr key={work.id} className="hover:bg-white">
                <td className="px-4 py-4 font-medium text-slate-900">{work.title}</td>
                <td className="px-4 py-4">{work.author}</td>
                <td className="px-4 py-4">{work.isbn}</td>
                <td className="px-4 py-4">{work.availableCopies}</td>
              </tr>
            ))}
            {filteredWorks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  Nenhuma obra encontrada para esta busca.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
