import React from 'react';
import { WidgetConfig } from '../../types';
import { getMockTournaments } from '../../services/api';
import { Trophy, Calendar, Users } from 'lucide-react';

export const TournamentWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const tournaments = getMockTournaments();

  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-slate-800 to-slate-900">
      <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3 border-b border-slate-700 pb-4">
        <Trophy className="text-amber-500" />
        {config.title || 'Turneringer'}
      </h2>

      <div className="flex flex-col gap-4">
        {tournaments.map((tour, idx) => (
          <div key={idx} className="bg-slate-700/40 p-4 rounded-lg border-l-4 border-amber-500 flex justify-between items-center">
            <div>
              <div className="text-xs text-amber-400 font-bold uppercase flex items-center gap-1 mb-1">
                <Calendar size={12} /> {tour.date}
              </div>
              <div className="text-lg font-semibold text-white">{tour.name}</div>
            </div>
            <div className="text-right bg-slate-800/80 px-3 py-2 rounded">
               <div className="text-xs text-slate-400 mb-1">Påmeldte</div>
               <div className="font-mono font-bold text-white flex items-center gap-1">
                 <Users size={14} className="text-slate-400"/>
                 {tour.signedUp} <span className="text-slate-500">/ {tour.max}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-4 text-center">
        <span className="inline-block bg-amber-500/10 text-amber-300 px-4 py-2 rounded-full text-sm font-medium">
          Meld deg på i GolfBox
        </span>
      </div>
    </div>
  );
};