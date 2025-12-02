import React from 'react';
import { WidgetConfig } from '../../types';
import { getMockNews } from '../../services/api';
import { Newspaper } from 'lucide-react';

export const NewsWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const news = getMockNews();

  return (
    <div className="flex flex-col h-full p-6 bg-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-slate-600 pb-4">
        <Newspaper className="text-blue-400" />
        {config.title || 'Nyheter'}
      </h2>

      <div className="flex flex-col gap-6 h-full overflow-hidden">
        {news.map((item, idx) => (
          <div key={idx} className="flex gap-4 bg-slate-700/30 rounded-xl p-3 hover:bg-slate-700/50 transition-colors">
             <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
               <img src={item.image} alt="" className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col justify-center">
               <div className="text-xs text-blue-300 font-bold uppercase mb-1">{item.source}</div>
               <h3 className="text-lg font-bold leading-tight mb-2">{item.title}</h3>
               <p className="text-sm text-slate-400 line-clamp-2">{item.summary}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};