import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScreenConfig } from '../types';
import { fetchScreenConfig } from '../services/api';
import { SlideRenderer } from '../components/SlideRenderer';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Loader2, AlertCircle } from 'lucide-react';

export const DisplayPage: React.FC = () => {
  const { screenId } = useParams();
  const [config, setConfig] = useState<ScreenConfig | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Initialize and Fetch Configuration
  useEffect(() => {
    let isMounted = true;
    const loadConfig = async () => {
      try {
        const id = screenId || "demo-screen-1"; 
        console.log("Loading config for:", id);
        const data = await fetchScreenConfig(id);
        if (isMounted) {
          setConfig(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Kunne ikke laste skjermkonfigurasjon.");
          setLoading(false);
        }
      }
    };
    
    loadConfig();
    return () => { isMounted = false; };
  }, [screenId]);

  // 2. Rotation Engine
  useEffect(() => {
    if (!config || !config.slides || config.slides.length === 0) return;

    const currentSlide = config.slides[currentSlideIndex];
    const duration = (currentSlide?.duration || 10) * 1000;

    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % config.slides.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [config, currentSlideIndex]);

  // 3. Render States
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <h1 className="text-2xl font-light tracking-wider">LOFTLOGIC</h1>
        <p className="text-slate-400 text-sm mt-2">Laster visning...</p>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-red-400">
        <AlertCircle className="w-16 h-16 mb-4" />
        <h2 className="text-xl">Feil ved lasting</h2>
        <p>{error || "Ingen data funnet"}</p>
        <p className="text-sm text-slate-500 mt-2">ID: {screenId}</p>
      </div>
    );
  }

  // Safely get current slide
  const currentSlide = config.slides[currentSlideIndex];

  if (!currentSlide) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-slate-500">
        Ingen slides tilgjengelig.
      </div>
    );
  }

  return (
    <main className="h-screen w-screen bg-slate-950 text-white overflow-hidden flex flex-col relative">
      
      {/* Global Header */}
      <Header 
        clubName={config.clubName} 
        clubUrl={config.clubUrl} 
        logoUrl={config.logoUrl} 
      />

      {/* Slide Container */}
      <div className="flex-1 relative overflow-hidden w-full fade-enter-active bg-slate-900">
        <SlideRenderer slide={currentSlide} clubName={config.clubName} />
        
        {/* Progress Bar */}
        <SlideProgress duration={currentSlide.duration || 10} key={currentSlide.id} />
      </div>

      {/* Global Footer */}
      <Footer />
      
    </main>
  );
}

const SlideProgress: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <div className="absolute bottom-0 left-0 h-1 bg-blue-600 z-40 animate-progress"
         style={{ 
           width: '100%', 
           animation: `shrink ${duration}s linear forwards` 
         }} 
    />
  );
};