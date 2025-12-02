import React, { useEffect } from 'react';
import { WidgetConfig } from '../../types';

export const GolfBoxLoginWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  
  useEffect(() => {
    // Dynamically load the GolfBox script
    const script = document.createElement('script');
    script.src = "https://www.golfforbundet.no/ngfGolfbox/golfbox_login.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Load CSS
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://www.golfforbundet.no/ngfGolfbox/golfbox_login.css";
    document.head.appendChild(link);

    return () => {
      // Cleanup mostly for local dev, though script remains in head usually
      if (document.body.contains(script)) {
         document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="h-full w-full bg-slate-100 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background image option */}
      {config.data?.imageUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: `url(${config.data.imageUrl})` }}
        ></div>
      )}

      <div className="z-10 bg-white/90 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 max-w-md w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{config.title || "Spillere"}</h2>
        <p className="text-slate-600 mb-8">{config.data?.subtext || "Vennligst registrer din ankomst her"}</p>
        
        {/* The Element targeted by the external script */}
        <div className="flex justify-center transform scale-125 origin-top">
           <a href="#" className="golfboxLoginOpen bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors font-bold shadow-lg">
             Logg inn i GolfBox
           </a>
        </div>
      </div>
    </div>
  );
};