
import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  id?: string;
}

export default function Section({ title, children, id }: SectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 border-b-2 border-yellow-700 pb-2 mb-6 tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
