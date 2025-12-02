// Enums for identifying widget types
export enum WidgetType {
  WEATHER_YR = 'weather_yr',
  GOLFBOX_TEE_TIMES = 'golfbox_tee_times',
  GOLFBOX_TOURNAMENTS = 'golfbox_tournaments',
  GOLFBOX_LOGIN = 'golfbox_login',
  NEWS_RSS = 'news_rss',
  MANUAL_OFFER = 'manual_offer',
  HEADER = 'header'
}

// Enums for Slide Layouts
export enum SlideLayout {
  FULLSCREEN = 'fullscreen', // One big widget
  SPLIT_VERTICAL = 'split_vertical', // Left/Right
  GRID_2X2 = 'grid_2x2', // 4 Quadrants
  SIDEBAR_RIGHT = 'sidebar_right' // Main content + Sidebar
}

// Interfaces
export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title?: string;
  data?: any; // Specific data for the widget (e.g., image URL, RSS url, IDs)
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  duration?: number; // seconds
  widgets: WidgetConfig[]; // Ordered list of widgets to fill layout slots
  backgroundUrl?: string;
}

export interface ScreenConfig {
  id: string;
  clubId: string;
  clubName: string;
  clubUrl?: string;
  logoUrl?: string;
  slides: Slide[];
  updatedAt: string;
}

// Admin Specific Types
export interface User {
  id: string;
  email: string;
  clubId: string;
  name: string;
}

export interface ScreenSummary {
  id: string;
  name: string; // e.g. "Proshop TV"
  status: 'active' | 'offline';
  lastActive: string;
}

// --- Data Models for Mocking ---

export interface TeeTime {
  time: string;
  players: string[];
  holes: 9 | 18;
  availableSlots: number;
}

export interface Tournament {
  date: string;
  name: string;
  signedUp: number;
  max: number;
}

export interface NewsItem {
  title: string;
  image: string;
  summary: string;
  source: string;
}

export interface WeatherForecast {
  time: string;
  temp: number;
  symbol: string; // e.g., 'sun', 'rain'
  precip: number;
}