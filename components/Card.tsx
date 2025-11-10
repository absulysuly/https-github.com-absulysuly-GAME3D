
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-yellow-600">
      <h3 className="mb-2 text-xl font-semibold text-yellow-400">{title}</h3>
      <div className="text-slate-200">{children}</div>
    </div>
  );
}
