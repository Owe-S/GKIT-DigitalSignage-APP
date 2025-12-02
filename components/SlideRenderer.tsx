import React from 'react';
import { Slide, SlideLayout, WidgetConfig } from '../types';
import { WeatherWidget } from './widgets/WeatherWidget';
import { TeeTimesWidget } from './widgets/TeeTimesWidget';
import { TournamentWidget } from './widgets/TournamentWidget';
import { NewsWidget } from './widgets/NewsWidget';
import { OfferWidget } from './widgets/OfferWidget';
import { GolfBoxLoginWidget } from './widgets/GolfBoxLoginWidget';

interface Props {
  slide: Slide;
  clubName: string;
}

export const SlideRenderer: React.FC<Props> = ({ slide, clubName }) => {
  
  if (!slide || !slide.widgets) {
    return <div className="w-full h-full flex items-center justify-center text-slate-500">Laster slide...</div>;
  }

  // Helper to find widget by index safely
  const getWidget = (index: number) => slide.widgets[index] || null;

  const renderWidget = (config: WidgetConfig | null, className: string = "") => {
    if (!config) return <div className={`bg-slate-800/50 rounded-xl ${className}`}></div>;
    
    return (
      <div className={`h-full w-full overflow-hidden bg-slate-800 rounded-xl shadow-2xl border border-slate-700 flex flex-col ${className}`}>
        <WidgetFactory config={config} />
      </div>
    );
  };

  // --- LAYOUT STRATEGIES ---

  // 1. Fullscreen (Single Widget)
  if (slide.layout === SlideLayout.FULLSCREEN) {
    return (
      <div className="w-full h-full p-0">
        {renderWidget(getWidget(0), "rounded-none border-0")}
      </div>
    );
  }

  // 2. Sidebar Right (Main content 70%, Sidebar 30% with 2 stacked widgets)
  if (slide.layout === SlideLayout.SIDEBAR_RIGHT) {
    return (
      <div className="w-full h-full p-6 flex gap-6">
        <div className="flex-[3] h-full">
          {renderWidget(getWidget(0))}
        </div>
        <div className="flex-1 h-full flex flex-col gap-6">
          <div className="flex-1">
            {renderWidget(getWidget(1))}
          </div>
          <div className="flex-1">
            {renderWidget(getWidget(2))}
          </div>
        </div>
      </div>
    );
  }

  // 3. Grid 2x2
  if (slide.layout === SlideLayout.GRID_2X2) {
    return (
      <div className="w-full h-full p-6 grid grid-cols-2 grid-rows-2 gap-6">
        {renderWidget(getWidget(0))}
        {renderWidget(getWidget(1))}
        {renderWidget(getWidget(2))}
        {renderWidget(getWidget(3))}
      </div>
    );
  }

  // Fallback
  return <div className="w-full h-full flex items-center justify-center text-slate-500">Layout {slide.layout} støttes ikke</div>;
};

const WidgetFactory: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  if (!config) return null;
  
  switch (config.type) {
    case 'weather_yr': return <WeatherWidget config={config} />;
    case 'golfbox_tee_times': return <TeeTimesWidget config={config} />;
    case 'golfbox_tournaments': return <TournamentWidget config={config} />;
    case 'golfbox_login': return <GolfBoxLoginWidget config={config} />;
    case 'news_rss': return <NewsWidget config={config} />;
    case 'manual_offer': return <OfferWidget config={config} />;
    default: return <div className="p-4 flex items-center justify-center h-full text-slate-400">Widget: {config.type}</div>;
  }
};