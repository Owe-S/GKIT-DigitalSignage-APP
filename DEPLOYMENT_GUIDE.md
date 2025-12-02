# Deployment Guide: New Club Setup

This guide explains how to use your **Master Git Repository** to launch the Digital Signage App for a new client (Golf Club).

## Concept
- **Git Repository**: Contains the *Generic Template* (White-label code).
- **Google Cloud**: Each club gets its own *Project* (isolated database, hosting, and billing).

## Workflow

### 1. Get the Code
Open your terminal and clone your master repository (if you haven't already):
```bash
git clone <YOUR_GIT_REPO_URL> new-club-project
cd new-club-project
```

### 2. Create New Google Cloud Project
1.  Log in to [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a **New Project** (e.g., `oslo-gk-display`).
3.  **Important**: If you are using `owe-admin@golfklubb-it.com`, create it under your own Organization or "No Organization" to avoid the `skigk.no` restrictions.

### 3. Configure the App for the New Club
1.  **Create Firebase Config**:
    - Go to Firebase Console -> Add Project (select the one you just created).
    - Register a Web App.
    - Copy the `firebaseConfig` keys.
2.  **Update Code**:
    - Open `services/firebaseConfig.ts` and paste the **NEW** keys.
    - Open `services/api.ts` and update `createDefaultConfig` with the new club's name (e.g., "Oslo Golfklubb").

### 4. Deploy
```bash
# Login to the new project
firebase login
firebase use --add
# Select the new project ID (e.g., oslo-gk-display)

# Deploy
npm run build
firebase deploy
```

## Summary
You do **not** need to rename the old project. The Git Repository is your "Source of Truth". You simply pull from it, customize the config for the new club, and deploy to a new cloud project.
