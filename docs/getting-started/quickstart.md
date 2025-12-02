# Quick Start Guide

Get your GKIT Digital Signage App up and running in minutes!

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ A Google Cloud / Firebase account
- ✅ Git installed

## Step 1: Clone the Repository

```bash
git clone https://github.com/Owe-S/GKIT-DigitalSignage-APP.git
cd GKIT-DigitalSignage-APP
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 18
- React Router DOM
- Firebase SDK
- Lucide React (icons)
- TypeScript

## Step 3: Firebase Configuration

### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Enter project name (e.g., `your-club-display`)
4. Follow the setup wizard

### 3.2 Register Web App

1. In your Firebase project, click the **Web** icon (</\>)
2. Register app name
3. Copy the `firebaseConfig` object

### 3.3 Update Configuration

Open `services/firebaseConfig.ts` and replace the placeholder values:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const USE_FIREBASE = true; // Set to true
```

### 3.4 Enable Firestore

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Production mode** or **Test mode**
4. Select a location

## Step 4: Run Locally

```bash
npm run dev
```

The app will start on `http://localhost:5173`

Visit `http://localhost:5173/screen/demo-screen-1` to see the display!

## Step 5: Access Admin Panel

Navigate to `http://localhost:5173/admin/login`

**Default Mock Credentials** (if Firebase auth not configured):
- Email: `admin@example.com`
- Password: Any password (mock mode)

!!! tip "Pro Tip"
    For production, always enable Firebase Authentication and set proper security rules!

## Next Steps

- [Configure your first screen](../deployment/new-club.md)
- [Customize widgets and layouts](../features/widgets.md)
- [Deploy to production](../deployment/overview.md)

## Troubleshooting

### Issue: Firebase errors on startup

**Solution**: Verify that `USE_FIREBASE = true` and your config keys are correct.

### Issue: White screen

**Solution**: Check browser console for errors. Ensure all dependencies are installed.

### Issue: Can't access admin panel

**Solution**: Try the `/admin/login` route. If using mock mode, any email works.

---

Need more help? Check the [Installation Guide](installation.md) or [Configuration Guide](configuration.md).
