import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Peshmerga: The Golden Square',
  description:
    "An interactive tactical FPS concept highlighting the Peshmerga's struggle against ISIS through detailed narrative, mechanics, and mission design.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
