
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

// Denne flagger om vi skal bruke ekte database eller test-data
// Sett denne til true NÅR du har limt inn nøklene over.
export const USE_FIREBASE = true;
