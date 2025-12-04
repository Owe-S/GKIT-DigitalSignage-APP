import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="h-10 bg-slate-950 border-t border-slate-900 flex items-center justify-center shrink-0 z-50 relative">
      <div className="flex items-baseline gap-2 opacity-60">
        <p className="text-xs text-slate-400 font-medium">Created by <span className="text-slate-300 font-bold">GKIT</span></p>
        <Link to="/admin" className="text-[10px] text-slate-600 uppercase tracking-wider hover:text-blue-400 hover:underline transition-colors cursor-pointer">
          for Clubsite CMS
        </Link>
      </div>
    </footer>
  );
};