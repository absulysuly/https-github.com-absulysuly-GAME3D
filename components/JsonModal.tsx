import React, { useState, useEffect } from 'react';

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  jsonData: object | null;
}

const JsonModal: React.FC<JsonModalProps> = ({ isOpen, onClose, jsonData }) => {
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
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 text-gray-200 rounded-lg shadow-xl w-full md:w-2/3 lg:w-1/2 max-h-[90vh] flex flex-col border border-gray-700"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-yellow-500">Generated JSON Data</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-2xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>
        <main className="p-4 overflow-y-auto">
          <pre className="bg-gray-900 p-4 rounded-md text-sm whitespace-pre-wrap break-words">
            <code>
              {formattedJson}
            </code>
          </pre>
        </main>
        <footer className="flex flex-wrap justify-end items-center p-4 border-t border-gray-700 gap-4">
          <button
            onClick={handleCopy}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors duration-200"
          >
            {copyButtonText}
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Download JSON
          </button>
        </footer>
      </div>
    </div>
  );
};

export default JsonModal;
