
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 border-b-2 border-yellow-700 pb-2 mb-6 tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;
