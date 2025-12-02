# Configuration Guide

Learn how to configure the GKIT Digital Signage App for your golf club.

## Firebase Configuration

### Setting Up Firebase

1. **Create Firebase Project** (if not already done)
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the wizard

2. **Add Web App**
   - In project overview, click Web icon (</\>)
   - Register app with a nickname
   - Copy the `firebaseConfig` object

3. **Update `services/firebaseConfig.ts`**

```typescript
export const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-club-id.firebaseapp.com",
  projectId: "your-club-id",
  storageBucket: "your-club-id.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxx"
};

export const USE_FIREBASE = true;
```

!!! warning "Security"
    Never commit real API keys to public repositories!

### Enable Firestore Database

1. In Firebase Console, go to **Build → Firestore Database**
2. Click **Create database**
3. Select location (choose closest to your users)
4. Start in **Test mode** for development

### Configure Firestore Security Rules

Update your Firestore rules for production:

```firebase
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Screens collection - public read, authenticated write
    match /screens/{screenId} {
      allow read: true;
      allow write: if request.auth != null;
    }
    
    // Users collection - authenticated only
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Enable Authentication

1. Go to **Build → Authentication**
2. Click **Get Started**
3. Enable sign-in methods:
   - **Email/Password** (recommended)
   - **Google** (optional)

## App Configuration

### Default Club Settings

Edit `services/api.ts` to set your club's default data:

```typescript
const createDefaultConfig = (id: string): ScreenConfig => ({
  id: id,
  clubId: 'your-club-id',
  clubName: 'Your Golf Club Name',
  clubUrl: 'yourclub.com',
  slides: [
    // ... your default slides
  ],
  updatedAt: new Date().toISOString()
});
```

### Environment Variables (Optional)

For production, consider using environment variables:

Create `.env.local`:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

Then modify `firebaseConfig.ts`:
```typescript
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## Widget Configuration

### Available Widgets

The app includes these built-in widgets:

- `GOLFBOX_TEE_TIMES` - Display tee times
- `WEATHER_YR` - Weather forecast
- `NEWS_RSS` - News feed
- `GOLFBOX_TOURNAMENTS` - Tournament list
- `MANUAL_OFFER` - Custom promotions

### Customize Widget Data

Mock data is defined in `services/api.ts`. For production, connect to real APIs:

```typescript
export const getMockTeeTimes = async () => {
  // Replace with real API call
  const response = await fetch('https://your-api.com/teetimes');
  return response.json();
};
```

## Screen Configuration

### Creating a New Screen

Screens are stored in Firestore under the `screens` collection.

Example screen document:
```json
{
  "id": "clubhouse-entrance",
  "clubId": "your-club",
  "clubName": "Your Golf Club",
  "clubUrl": "yourclub.com",
  "logoUrl": "https://yourclub.com/logo.png",
  "slides": [
    {
      "id": "slide-1",
      "layout": "SIDEBAR_RIGHT",
      "duration": 15,
      "widgets": [
        {
          "id": "w1",
          "type": "GOLFBOX_TEE_TIMES",
          "title": "Today's Tee Times"
        }
      ]
    }
  ],
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Slide Layouts

Choose from:
- `FULLSCREEN` - Single widget, full screen
- `SIDEBAR_RIGHT` - Main content + right sidebar (3 widgets)
- `GRID_2X2` - 4 widgets in a grid

## Build Configuration

### Vite Configuration

The build is configured in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
```

### Firebase Hosting

Configure hosting in `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Next Steps

- [Deploy your first screen](../deployment/new-club.md)
- [Explore features](../features/display.md)
- [API Reference](../api/overview.md)
