# Deployment Overview

Learn how to deploy the GKIT Digital Signage App to production.

## Deployment Options

The app can be deployed to:

1. **Firebase Hosting** (Recommended) - Fast, global CDN
2. **Google Cloud Run** - Container-based deployment
3. **Vercel/Netlify** - Alternative static hosting

## Firebase Hosting (Recommended)

### Why Firebase Hosting?

✅ **Optimized for Firebase apps**  
✅ **Global CDN** - Fast worldwide  
✅ **Free SSL** certificates  
✅ **Simple deployment** with CLI  
✅ **Custom domains** supported  
✅ **Automatic HTTPS** redirect

### Prerequisites

- Firebase project created
- Firebase CLI installed
- Project configured (see [Configuration Guide](../getting-started/configuration.md))

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase (if not done)

```bash
firebase init
```

Select:
- **Hosting** (use spacebar to select)
- Choose your project
- Build directory: `dist`
- Single-page app: **Yes**
- GitHub deploys: Optional

### Step 4: Build the App

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

### Step 5: Deploy

```bash
firebase deploy --only hosting
```

You'll see output like:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project/overview
Hosting URL: https://your-project.web.app
```

## Custom Domain

### Add Your Domain

1. Go to Firebase Console → Hosting
2. Click **Add custom domain**
3. Enter your domain (e.g., `display.yourclub.com`)
4. Follow DNS verification steps
5. Add the provided DNS records to your registrar

Firebase will automatically provision SSL certificates.

## Deployment Checklist

Before deploying to production:

- [ ] Update Firebase config with production keys
- [ ] Set `USE_FIREBASE = true`
- [ ] Configure Firestore security rules
- [ ] Enable Firebase Authentication
- [ ] Test all features locally
- [ ] Build succeeds without errors
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring/analytics

## Environment-Specific Configs

### Development
```bash
npm run dev  # Uses local config
```

### Production
```bash
npm run build  # Creates optimized build
firebase deploy  # Deploys to hosting
```

## Continuous Deployment (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - run: npm ci
      - run: npm run build
      
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

## Monitoring

### Firebase Analytics

Enable in Firebase Console:
1. Go to **Analytics**
2. Click **Enable Analytics**
3. Choose data sharing settings

### Error Monitoring

Consider adding [Sentry](https://sentry.io/):

```bash
npm install @sentry/react
```

Configure in `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

## Rollback

If you need to rollback a deployment:

```bash
firebase hosting:channel:deploy previous-version
```

Or restore from Firebase Console → Hosting → Release history.

## Next Steps

- [New Club Setup Guide](new-club.md)
- [Firebase Setup Details](firebase.md)
- [Google Cloud Configuration](google-cloud.md)

## Troubleshooting

### Build fails

Check:
- Node version (must be 18+)
- Dependencies installed correctly
- No TypeScript errors

### Deploy succeeds but app shows errors

Check:
- Firebase config is correct in production
- Firestore security rules allow reads
- Authentication is configured

### Slow loading

- Ensure Firebase Hosting is used (global CDN)
- Check bundle size: `npm run build -- --report`
- Consider code splitting for large apps
