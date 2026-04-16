import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca Corporativa',
  description: 'Portal do Leitor para pesquisa de acervo e histórico de empréstimos'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
