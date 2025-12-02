import React from 'react';
import { WidgetConfig } from '../../types';
import { CloudSun } from 'lucide-react';

export const WeatherWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  // Default location ID (Ski) if none provided in admin
  const defaultLocationId = "1-2233327";
  const locationId = config.data?.locationId || defaultLocationId;
  
  const srcUrl = `https://www.yr.no/nb/innhold/${locationId}/table.html?mode=dark`;

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Iframes interact badly with drag/drop or touches sometimes, so we keep it simple */}
      </div>

      {/* We use the iframe provided but ensure it fills container */}
      <iframe 
        src={srcUrl} 
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 0, 
        }}
        title="Yr Værvarsel"
      ></iframe>
      
      {/* Fallback title overlay if needed, though Yr has its own */}
      {!locationId && (
        <div className="absolute top-0 left-0 p-4 bg-black/50 text-white">
          <div className="flex items-center gap-2">
            <CloudSun /> {config.title || "Været"}
          </div>
        </div>
      )}
    </div>
  );
};