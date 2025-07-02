import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

type CopyButtonProps = {
  children?: React.ReactNode;
  text: string;
};

function CopyButton({ children, text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      console.error('Failed to copy text to clipboard');
      setCopied(false);
    }
  };

  // 清理 timeout，避免記憶體洩漏
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const SvgClipboard = (
    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
    </svg>
  )

  const SvgCheck = (
    <svg className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
    </svg>
  );

  return (
    <div className="btn-copy-row relative inline-flex items-center w-full">
      {children}
      <div className="relative">
        <button
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          className="absolute -end-8 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
        >
          {copied ? SvgCheck : SvgClipboard}
        </button>
        <div
          role="tooltip"
          className={clsx(
            'absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white',
            '-left-5 bottom-4',
            'transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs tooltip dark:bg-gray-700',
          copied ? 'opacity-100 visible' : 'opacity-0 invisible'
          )}
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
};

export default CopyButton;
