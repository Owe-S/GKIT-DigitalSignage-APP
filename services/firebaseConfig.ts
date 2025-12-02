
// --- VIKTIG: LIM INN DIN FIREBASE CONFIG HER ---
// Du finner disse verdiene i Firebase Console -> Project Settings -> General -> Your apps

// 1. Kopier "const firebaseConfig = { ... }" fra Firebase-konsollen (Steg 2 på skjermen din).
// 2. Erstatt hele objektet under med det du kopierte.

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Denne flagger om vi skal bruke ekte database eller test-data
// Sett denne til true NÅR du har limt inn nøklene over.
export const USE_FIREBASE = true;
