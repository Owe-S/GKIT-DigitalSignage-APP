import React from 'react';
import { Shield } from 'lucide-react';

interface HeaderProps {
  clubName: string;
  clubUrl?: string;
  logoUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ clubName, clubUrl, logoUrl }) => {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 shrink-0 shadow-lg z-40 relative">
      <div className="flex items-center gap-4">
        {logoUrl ? (
           <img src={logoUrl} alt="Club Logo" className="w-12 h-12 object-contain" />
        ) : (
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-inner">
            <Shield size={28} strokeWidth={2.5} />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide leading-none">{clubName}</h1>
          <span className="text-xs text-slate-400 tracking-wider uppercase">Velkommen</span>
        </div>
      </div>
      
      <div className="flex items-center">
        {clubUrl && (
          <div className="text-xl text-blue-400 font-medium tracking-tight bg-blue-900/20 px-4 py-1 rounded-full border border-blue-800/50">
            {clubUrl}
          </div>
        )}
      </div>
    </header>
  );
};