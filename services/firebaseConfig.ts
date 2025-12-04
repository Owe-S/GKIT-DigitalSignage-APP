
// --- VIKTIG: LIM INN DIN FIREBASE CONFIG HER ---
// Du finner disse verdiene i Firebase Console -> Project Settings -> General -> Your apps

// 1. Kopier "const firebaseConfig = { ... }" fra Firebase-konsollen (Steg 2 på skjermen din).
// 2. Erstatt hele objektet under med det du kopierte.

export const firebaseConfig = {
  apiKey: "AIzaSyA-vPTense9tswdvv95rDIZkP52BneMc9M",
  authDomain: "loftlogic-display.firebaseapp.com",
  projectId: "loftlogic-display",
  storageBucket: "loftlogic-display.firebasestorage.app",
  messagingSenderId: "99504031016",
  appId: "1:99504031016:web:4b6abcfa964af7553dfc1d"
};

import { getStorage } from 'firebase/storage';

// Denne flagger om vi skal bruke ekte database eller test-data
// Sett denne til true NÅR du har limt inn nøklene over.
export const USE_FIREBASE = true;

// Initialize Storage (will be used in api.ts)
// Note: We don't export 'app' here, so we'll initialize it in api.ts or move app init here.
// Better practice: Move app init here or export config only.
// For minimal changes, we'll just keep config export and let api.ts handle init, 
// BUT api.ts needs to export storage for components to use.

