'use client';

import { useState } from 'react';

export interface NavigationSection {
  id: string;
  label: string;
}

interface TopNavBarProps {
  onOpenJson: () => void;
  sections: NavigationSection[];
}

export default function TopNavBar({ onOpenJson, sections }: TopNavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-lg font-semibold text-yellow-400">
            GS
          </span>
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Peshmerga</p>
            <p className="text-lg font-semibold text-slate-100">The Golden Square</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-500 hover:text-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
        </button>

        <div
          id="primary-navigation"
          className="hidden w-full flex-1 items-center justify-end gap-6 lg:flex"
        >
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-300">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  className="transition hover:text-yellow-300 focus-visible:text-yellow-300 focus-visible:outline-none"
                  onClick={() => handleNavigate(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onOpenJson}
            className="rounded-md bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            View JSON
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950/95 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
            <ul className="flex flex-col gap-3 text-sm font-medium text-slate-300">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    className="w-full text-left transition hover:text-yellow-300 focus-visible:text-yellow-300 focus-visible:outline-none"
                    onClick={() => handleNavigate(section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenJson();
              }}
              className="w-full rounded-md bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              View JSON
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
