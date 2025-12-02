import React from 'react';
import { WidgetConfig } from '../../types';
import { Clock } from 'lucide-react';

export const TeeTimesWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  // Default GUID (Sample) if none provided
  const defaultGuid = "{4D74E60B-697B-40E1-98A3-34CB1B14B079}";
  const guid = config.data?.golfboxGuid || defaultGuid;
  const slideNum = config.data?.slideNum || "1";
  const lang = "1044"; // Norwegian

  const srcUrl = `https://www.golfbox.no/site/tv/starttimes.asp?slideNum=${slideNum}&ssguid=${guid}&lang=${lang}`;

  return (
    <div className="h-full w-full bg-white relative overflow-hidden">
      {/* Overlay title if iframe fails to load or for consistency */}
      <div className="absolute top-0 right-0 bg-green-900 text-white px-3 py-1 text-xs z-10 rounded-bl-lg opacity-50 hover:opacity-100 transition-opacity">
         GolfBox Live
      </div>

      <iframe
        src={srcUrl}
        className="w-full h-full border-0"
        title="GolfBox Tee Times"
      />
    </div>
  );
};