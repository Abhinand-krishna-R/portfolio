import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden ${className}`}>
      {/* Code Header Bar */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-800 bg-neutral-950/50">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="text-neutral-500 hover:text-neutral-300 p-1 rounded hover:bg-neutral-850 transition-colors cursor-pointer"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      
      {/* Code Area */}
      <pre className="p-4 overflow-x-auto text-[12px] font-mono text-neutral-200 leading-relaxed max-h-[350px]">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
