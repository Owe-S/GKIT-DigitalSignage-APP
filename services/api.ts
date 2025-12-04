
import { ScreenConfig, SlideLayout, WidgetType, ScreenSummary, User, Slide, ClubSettings } from '../types';
import { firebaseConfig, USE_FIREBASE } from './firebaseConfig';

// --- FIREBASE IMPORTS (Dynamically loaded if needed) ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Initialize Firebase Instance
let auth: any;
let db: any;
let storage: any;

if (USE_FIREBASE) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
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
    clubId: 'skigk',
    clubName: 'Ski Golfklubb',
    clubUrl: 'www.skig.no',
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
  clubId: 'skigk',
  clubName: 'Ski Golfklubb',
  clubUrl: 'www.skig.no',
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

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  if (!USE_FIREBASE || !auth) throw new Error("Firebase not configured");

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    return {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || 'Admin',
      clubId: 'skigk' // In a real app, fetch from Firestore 'users' collection
    };
  } catch (error: any) {
    console.error("Login failed:", error);
    throw new Error(error.message || "Login failed");
  }
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
    clubId: 'skigk' // In a real app, we would fetch this from a 'users' collection
  };
}

export const logout = async (): Promise<void> => {
  if (!USE_FIREBASE || !auth) return;
  await signOut(auth);
};

export const getCurrentUserProfile = async (): Promise<User | null> => {
  if (!USE_FIREBASE || !auth) return { id: 'mock-user', email: 'admin@demo.no', name: 'Demo Admin', clubId: 'skigk' };

  const currentUser = auth.currentUser;
  if (!currentUser) return null;

  try {
    // Try to fetch user profile from Firestore
    if (db) {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          id: currentUser.uid,
          email: currentUser.email || '',
          name: userData.name || currentUser.displayName || 'Admin',
          clubId: userData.clubId || 'skigk' // Fallback if clubId is missing
        };
      }
    }

    // If no profile exists, return basic info with default clubId
    // In a real app, we might force a "Complete Profile" step here
    return {
      id: currentUser.uid,
      email: currentUser.email || '',
      name: currentUser.displayName || 'Admin',
      clubId: 'skigk'
    };
  } catch (e) {
    console.error("Error fetching user profile:", e);
    return null;
  }
};

export const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'GKIT-DigitalSignage/1.0 github.com/Owe-S/GKIT-DigitalSignage-APP'
        }
      }
    );

    if (!response.ok) throw new Error('Weather fetch failed');
    return await response.json();
  } catch (e) {
    console.error("Error fetching weather:", e);
    // Fallback mock data if API fails (e.g. rate limit)
    return null;
  }
};

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

export const fetchClubSettings = async (clubId: string): Promise<ClubSettings> => {
  if (USE_FIREBASE && db) {
    try {
      const docRef = doc(db, "clubs", clubId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as ClubSettings;
      } else {
        // Create default settings if they don't exist
        const defaultSettings: ClubSettings = {
          clubId,
          clubName: 'Ski Golfklubb',
          clubUrl: 'www.skig.no',
          logoUrl: '',
          updatedAt: new Date().toISOString()
        };
        await setDoc(doc(db, "clubs", clubId), defaultSettings);
        return defaultSettings;
      }
    } catch (e) {
      console.error("Error fetching club settings:", e);
      throw e;
    }
  }

  // Mock fallback
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
    clubId,
    clubName: 'Ski Golfklubb',
    clubUrl: 'www.skig.no',
    logoUrl: '',
    updatedAt: new Date().toISOString()
  };
};

export const updateClubSettings = async (settings: ClubSettings): Promise<boolean> => {
  if (USE_FIREBASE && db) {
    try {
      await setDoc(doc(db, "clubs", settings.clubId), {
        ...settings,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (e) {
      console.error("Error updating club settings:", e);
      return false;
    }
  }

  // Mock
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const uploadImage = async (file: File, path: string = 'uploads'): Promise<string> => {
  if (!USE_FIREBASE || !storage) {
    // Mock upload
    console.log("Mock uploading file:", file.name);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return URL.createObjectURL(file);
  }

  try {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (e) {
    console.error("Upload failed:", e);
    throw new Error("Image upload failed");
  }
};

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
