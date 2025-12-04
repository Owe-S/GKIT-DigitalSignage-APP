# GKIT Digital Signage App

Digital signage system for golf clubs. Built with React, Vite, and Firebase.
Designed to run on Smart TVs, PC monitors, and tablets.

## 🚀 Live Access

- **Display URL:** [https://gkit-digital-signage.web.app](https://gkit-digital-signage.web.app)
- **Admin Panel:** [https://gkit-digital-signage.web.app/#/admin](https://gkit-digital-signage.web.app/#/admin)

## 📦 Deployment History

### Initial Deploy - 20.11.2025
```text
=== Deploying to 'loftlogic-display'...

i  deploying hosting
i  hosting[loftlogic-display]: beginning deploy...
i  hosting[loftlogic-display]: found 3 files in dist
+  hosting[loftlogic-display]: file upload complete
i  hosting[loftlogic-display]: finalizing version...
+  hosting[loftlogic-display]: version finalized
i  hosting[loftlogic-display]: releasing new version...
+  hosting[loftlogic-display]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/loftlogic-display/overview
Hosting URL: https://loftlogic-display.web.app
```

## 🛠️ How to Develop & Deploy

### Local Development
```bash
npm install
npm run dev
```

### Deploy Updates to Production
1. Build the production files:
   ```bash
   npm run build
   ```
2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

## 🔧 Configuration

- **Firebase Config:** Located in `services/firebaseConfig.ts`.
- **Database:** Uses Cloud Firestore.
- **Authentication:** Uses Firebase Auth (Google Provider).

## 📁 Project Structure

- `/pages/DisplayPage.tsx` - Main TV display logic (Auto-rotation, Slide rendering).
- `/pages/admin` - Backoffice for managing screens and slides.
- `/components/widgets` - Individual widgets (Yr, GolfBox, Offers, etc).
- `/services/api.ts` - Data layer connecting to Firestore.
