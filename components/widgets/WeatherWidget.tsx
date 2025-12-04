import React, { useEffect, useState } from 'react';
import { WidgetConfig } from '../../types';
import { fetchWeatherData, getMockWeather } from '../../services/api';
import { Cloud, CloudRain, CloudSun, Sun, Wind, Droplets, Loader2 } from 'lucide-react';

export const WeatherWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Default to Ski Golfklubb if not set
  const lat = config.data?.lat || 59.72;
  const lon = config.data?.lon || 10.84;

  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchWeatherData(lat, lon);
      if (data) {
        setWeather(data);
      } else {
        // Fallback to mock if API fails
        setWeather({ mock: true, timeseries: getMockWeather() });
      }
      setLoading(false);
    };

    loadWeather();
    // Refresh every 30 mins
    const interval = setInterval(loadWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lat, lon]);

  if (loading) return <div className="h-full flex items-center justify-center bg-slate-900 text-slate-500"><Loader2 className="animate-spin" /></div>;

  // Helper to get icon
  const getWeatherIcon = (symbol: string) => {
    if (symbol.includes('rain')) return <CloudRain size={48} className="text-blue-400" />;
    if (symbol.includes('cloud') && symbol.includes('sun')) return <CloudSun size={48} className="text-yellow-400" />;
    if (symbol.includes('cloud')) return <Cloud size={48} className="text-slate-400" />;
    return <Sun size={48} className="text-yellow-500" />;
  };

  // Parse API data (simplified)
  const current = weather.properties?.timeseries[0]?.data?.instant?.details;
  const nextHour = weather.properties?.timeseries[0]?.data?.next_1_hours?.summary?.symbol_code;
  const forecast = weather.properties?.timeseries.filter((t: any, i: number) => i > 0 && i % 6 === 0).slice(0, 4);

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 text-white p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-1">{config.title || "Været på banen"}</h2>
          <p className="text-slate-400">{new Date().toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-bold flex items-center gap-4">
            {getWeatherIcon(nextHour || 'cloud')}
            {Math.round(current?.air_temperature || 18)}°
          </div>
          <div className="text-slate-400 mt-2 flex items-center justify-end gap-4 text-sm">
            <span className="flex items-center gap-1"><Wind size={14} /> {current?.wind_speed || 3} m/s</span>
            <span className="flex items-center gap-1"><Droplets size={14} /> {weather.properties?.timeseries[0]?.data?.next_1_hours?.details?.precipitation_amount || 0} mm</span>
          </div>
        </div>
      </div>

      {/* Forecast Row */}
      <div className="grid grid-cols-4 gap-4 mt-auto">
        {forecast?.map((point: any, idx: number) => {
          const time = new Date(point.time).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
          const symbol = point.data.next_1_hours?.summary?.symbol_code || 'cloud';
          const temp = Math.round(point.data.instant.details.air_temperature);

          return (
            <div key={idx} className="bg-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-slate-700">
              <span className="text-slate-400 text-sm">{time}</span>
              {getWeatherIcon(symbol)}
              <span className="text-xl font-bold">{temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};