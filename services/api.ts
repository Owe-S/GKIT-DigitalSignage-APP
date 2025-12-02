
import { ScreenConfig, SlideLayout, WidgetType, ScreenSummary, User, Slide } from '../types';
import { firebaseConfig, USE_FIREBASE } from './firebaseConfig';

// --- FIREBASE IMPORTS (Dynamically loaded if needed) ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

// Initialize Firebase Instance
let auth: any;
let db: any;

if (USE_FIREBASE) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
  } catch (e) {
    console.error("Failed to initialize Firebase. Check your firebaseConfig.ts", e);
  }
}

// --- MOCK DATABASE (Fallback) ---
let MOCK_SCREENS: ScreenSummary[] = [
  { id: 'demo-screen-1', name: 'Klubbhus Hovedinngang', status: 'active', lastActive: 'Nå' },
  { id: 'screen-2', name: 'Proshop Kasse', status: 'active', lastActive: '5 min siden' },
  { id: 'screen-3', name: 'Restaurant', status: 'offline', lastActive: '2 dager siden' },
];

let MOCK_CONFIGS: Record<string, ScreenConfig> = {
  'demo-screen-1': {
    id: 'demo-screen-1',
    clubId: 'club-id',
    clubName: 'Din Golfklubb',
    clubUrl: 'www.dingolfklubb.no',
    logoUrl: '',
    updatedAt: new Date().toISOString(),
    slides: [
      {
        id: 'slide-1',
        layout: SlideLayout.SIDEBAR_RIGHT,
        duration: 15,
        widgets: [
          { id: 'w1', type: WidgetType.GOLFBOX_TEE_TIMES, title: 'Neste Starttider - Hull 1-18' },
          { id: 'w2', type: WidgetType.WEATHER_YR, title: 'Været på banen' },
          { id: 'w3', type: WidgetType.NEWS_RSS, title: 'Nyheter fra Norsk Golf' }
        ]
      },
      {
        id: 'slide-2',
        layout: SlideLayout.FULLSCREEN,
        duration: 10,
        widgets: [
          {
            id: 'w4',
            type: WidgetType.MANUAL_OFFER,
            title: 'Ukens Tilbud i Proshop',
            data: {
              imageUrl: 'https://picsum.photos/1920/1080',
              headline: '50% på alle regnjakker!',
              subtext: 'Gjelder så lenge lageret rekker. Medlemmer får ekstra bonuspoeng.'
            }
          }
        ]
      },
      {
        id: 'slide-3',
        layout: SlideLayout.GRID_2X2,
        duration: 12,
        widgets: [
          { id: 'w5', type: WidgetType.GOLFBOX_TOURNAMENTS, title: 'Kommende Turneringer' },
          {
            id: 'w6',
            type: WidgetType.MANUAL_OFFER,
            title: 'Restauranten',
            data: {
              imageUrl: 'https://picsum.photos/800/600',
              headline: 'Dagens Husmann',
              subtext: 'Kjøttkaker med erterstuing kr 189,-'
            }
          },
          { id: 'w7', type: WidgetType.WEATHER_YR, title: 'Helgeværet' },
          { id: 'w8', type: WidgetType.NEWS_RSS, title: 'Siste nytt' }
        ]
      }
    ]
  }
};

// --- API IMPLEMENTATION ---

export const fetchScreenConfig = async (screenId: string): Promise<ScreenConfig> => {
  // FIREBASE IMPLEMENTATION
  if (USE_FIREBASE && db) {
    try {
      const docRef = doc(db, "screens", screenId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as ScreenConfig;
      } else {
        // Create default if it doesn't exist (Auto-provisioning)
        const newConfig = createDefaultConfig(screenId);
        await setDoc(doc(db, "screens", screenId), newConfig);
        return newConfig;
      }
    } catch (e) {
      console.error("Firebase Fetch Error", e);
      // Fallback to mock if firebase fails
    }
  }

  // MOCK IMPLEMENTATION
  await new Promise(resolve => setTimeout(resolve, 200));
  if (MOCK_CONFIGS[screenId]) return MOCK_CONFIGS[screenId];
  const newConfig = createDefaultConfig(screenId);
  MOCK_CONFIGS[screenId] = newConfig;
  return newConfig;
};

const createDefaultConfig = (id: string): ScreenConfig => ({
  id: id,
  clubId: 'club-id',
  clubName: 'Din Golfklubb',
  clubUrl: 'www.dingolfklubb.no',
  slides: [
    {
      id: 'default-slide',
      layout: SlideLayout.FULLSCREEN,
      duration: 10,
      widgets: [
        { id: 'w-def', type: WidgetType.WEATHER_YR, title: 'Velkommen' }
      ]
    }
  ],
  updatedAt: new Date().toISOString()
});

export const mockLogin = async (email: string): Promise<User> => {
  // FIREBASE IMPLEMENTATION
  if (USE_FIREBASE && auth) {
    // Note: This function name 'mockLogin' is kept for compatibility with LoginPage.tsx, 
    // but it performs real auth if configured.

    // If email is provided, we assume email/pass flow (simplified)
    // For this demo, we'll focus on the Google Popup flow which is triggered separately
    return { id: 'fb-user', email, name: 'Firebase User', clubId: 'club-id' };
  }

  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: 'user-123', email: email, name: 'Admin Bruker', clubId: 'club-id' };
};

export const loginWithGoogle = async (): Promise<User> => {
  if (!USE_FIREBASE || !auth) throw new Error("Firebase not configured");

  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  return {
    id: user.uid,
    email: user.email || '',
    name: user.displayName || 'Admin',
    clubId: 'club-id' // In a real app, we would fetch this from a 'users' collection
  };
}

export const fetchScreens = async (clubId: string): Promise<ScreenSummary[]> => {
  if (USE_FIREBASE && db) {
    // In a real app, we would query collection(db, 'screens') where clubId == clubId
    // For now, we return the mock list but could easily switch to:
    // const q = query(collection(db, "screens"), where("clubId", "==", clubId));
    // ...
  }
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...MOCK_SCREENS];
};

export const createScreen = async (name: string): Promise<ScreenSummary> => {
  const newId = `screen-${Date.now()}`;
  const newScreen: ScreenSummary = {
    id: newId,
    name: name,
    status: 'offline',
    lastActive: 'Aldri'
  };

  if (USE_FIREBASE && db) {
    // Also create the empty config in Firestore
    const config = createDefaultConfig(newId);
    await setDoc(doc(db, "screens", newId), config);
  }

  // Update local mock state as well for UI responsiveness
  await new Promise(resolve => setTimeout(resolve, 400));
  MOCK_SCREENS.push(newScreen);
  MOCK_CONFIGS[newId] = createDefaultConfig(newId);

  return newScreen;
};

export const deleteScreen = async (screenId: string): Promise<boolean> => {
  if (USE_FIREBASE && db) {
    await deleteDoc(doc(db, "screens", screenId));
  }

  await new Promise(resolve => setTimeout(resolve, 300));
  MOCK_SCREENS = MOCK_SCREENS.filter(s => s.id !== screenId);
  delete MOCK_CONFIGS[screenId];
  return true;
};

export const updateScreenConfig = async (config: ScreenConfig): Promise<boolean> => {
  if (USE_FIREBASE && db) {
    try {
      await setDoc(doc(db, "screens", config.id), config);
      console.log("Saved to Firestore:", config.id);
    } catch (e) {
      console.error("Error saving to Firestore", e);
      return false;
    }
  }

  await new Promise(resolve => setTimeout(resolve, 600));
  MOCK_CONFIGS[config.id] = config;
  return true;
}

// Mock Data Helpers
export const getMockTeeTimes = () => {
  const now = new Date();
  const times = [];
  for (let i = 0; i < 8; i++) {
    const t = new Date(now.getTime() + i * 10 * 60000);
    times.push({
      time: t.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' }),
      players: Math.random() > 0.5 ? ['Ole', 'Kari', 'Per'] : ['Ledig', 'Ledig', 'Ledig', 'Ledig'],
      holes: 18,
      availableSlots: Math.floor(Math.random() * 4)
    });
  }
  return times;
};

export const getMockTournaments = () => [
  { date: '15. Juni', name: 'Sommerpokalen 2024', signedUp: 45, max: 72 },
  { date: '22. Juni', name: 'Pink Cup', signedUp: 12, max: 100 },
  { date: '01. Juli', name: 'Klubbmesterskap Dag 1', signedUp: 88, max: 90 },
];

export const getMockWeather = () => [
  { time: 'Nå', temp: 18, symbol: 'sun', precip: 0 },
  { time: '14:00', temp: 19, symbol: 'cloud-sun', precip: 0 },
  { time: '16:00', temp: 17, symbol: 'rain', precip: 2.5 },
  { time: '18:00', temp: 15, symbol: 'cloud', precip: 0.1 },
];

export const getMockNews = () => [
  { title: 'Hovland herjer på PGA touren', source: 'Norsk Golf', image: 'https://picsum.photos/400/300?random=1', summary: 'Spiller sin beste golf noensinne denne uken.' },
  { title: 'Nye regler for handicap', source: 'GolfBox', image: 'https://picsum.photos/400/300?random=2', summary: 'WHS systemet oppdateres fra 1. januar.' },
];
