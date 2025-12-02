import React from 'react';
import { WidgetConfig } from '../../types';

export const OfferWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const data = config.data || {};

  // If it's a fullscreen generic offer without specific data
  if (!data.imageUrl) {
    return (
      <div className="flex items-center justify-center h-full bg-orange-600">
        <h1 className="text-6xl font-bold">{config.title}</h1>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-slate-900 overflow-hidden group">
      {/* Background Image with Zoom Animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-110"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-12 flex flex-col items-start">
        {config.title && (
          <div className="bg-red-600 text-white text-lg font-bold px-4 py-1 uppercase tracking-widest mb-4 rounded shadow-lg">
            {config.title}
          </div>
        )}
        <h1 className="text-6xl font-black text-white mb-4 shadow-black drop-shadow-lg max-w-4xl leading-tight">
          {data.headline || 'Tilbud'}
        </h1>
        <p className="text-3xl text-slate-200 font-light max-w-3xl drop-shadow-md">
          {data.subtext}
        </p>
      </div>
    </div>
  );
};