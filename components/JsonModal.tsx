'use client';

import { useEffect, useState } from 'react';
import type { GameConcept } from '@/types';

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  jsonData: GameConcept | null;
}

export default function JsonModal({ isOpen, onClose, jsonData }: JsonModalProps) {
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');

  useEffect(() => {
    // Reset button text when modal is opened or jsonData changes
    setCopyButtonText('Copy to Clipboard');
  }, [isOpen, jsonData]);
  
  useEffect(() => {
    // Handle Escape key press
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen || !jsonData) return null;

  const formattedJson = JSON.stringify(jsonData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Failed to copy');
    });
  };

  const handleDownload = () => {
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game-concept.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="flex max-h-[90vh] w-full flex-col rounded-lg border border-slate-700 bg-slate-900/95 text-slate-100 shadow-xl md:w-2/3 lg:w-1/2"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-700 p-4">
          <h2 className="text-xl font-bold text-yellow-500">Generated JSON Data</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-slate-400 transition hover:text-white"
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>
        <main className="overflow-y-auto p-4">
          <pre className="whitespace-pre-wrap break-words rounded-md bg-slate-950 p-4 text-sm">
            <code>
              {formattedJson}
            </code>
          </pre>
        </main>
        <footer className="flex flex-wrap items-center justify-end gap-4 border-t border-slate-700 p-4">
          <button
            onClick={handleCopy}
            className="rounded-md bg-yellow-500/90 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-yellow-400"
          >
            {copyButtonText}
          </button>
          <button
            onClick={handleDownload}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500"
          >
            Download JSON
          </button>
        </footer>
      </div>
    </div>
  );
}
