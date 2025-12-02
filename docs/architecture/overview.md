# Architecture Overview

Understanding the GKIT Digital Signage App architecture.

## High-Level Architecture

```
┌─────────────────┐
│   Web Browser   │
│  (Display/Admin)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React Frontend │
│   TypeScript    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Firebase SDK   │
└────────┬────────┘
         │
    ┌────┴───────┐
    │            │
    ▼            ▼
┌────────┐  ┌───────────┐
│Firebase│  │ Firestore │
│  Auth  │  │ Database  │
└────────┘  └───────────┘
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend Services
- **Firebase Authentication** - User management
- **Cloud Firestore** - NoSQL database
- **Firebase Hosting** - Static file hosting

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **MkDocs** - Documentation

## Project Structure

```
GKIT-DigitalSignage-APP/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SlideRenderer.tsx
│   │   └── widgets/      # Widget components
│   ├── pages/            # Route pages
│   │   ├── DisplayPage.tsx
│   │   └── admin/        # Admin panel pages
│   ├── services/         # Business logic & APIs
│   │   ├── api.ts
│   │   └── firebaseConfig.ts
│   ├── types.ts          # TypeScript types
│   ├── constants.tsx     # App constants
│   ├── index.tsx         # Entry point
│   └── App.tsx           # Root component
├── docs/                 # MkDocs documentation
├── dist/                 # Build output
├── firebase.json         # Firebase config
├── firestore.rules       # Security rules
├── package.json          # Dependencies
├── vite.config.ts        # Build config
└── tsconfig.json         # TypeScript config
```

## Core Concepts

### 1. Screens
A **Screen** represents a physical display device. Each screen has:
- Unique ID
- Club association
- Collection of slides
- Configuration metadata

### 2. Slides
A **Slide** is a single view that rotates on a screen:
- Layout type (Fullscreen, Sidebar, Grid)
- Duration (seconds)
- Collection of widgets
- Transition effects

### 3. Widgets
**Widgets** are modular content blocks:
- Type (tee times, weather, news, etc.)
- Configuration
- Data source
- Render logic

### 4. Layouts
**Layouts** define widget arrangement:
- **Fullscreen**: 1 large widget
- **Sidebar Right**: Main + 3 sidebar widgets
- **Grid 2x2**: 4 equal-sized widgets

## Data Flow

### Display Page Flow

```
User visits /screen/:id
    ↓
DisplayPage fetches config from Firestore
    ↓
Screen configuration loaded
    ↓
Slides render one-by-one
    ↓
Widgets fetch their data
    ↓
Auto-rotation based on duration
```

### Admin Panel Flow

```
Admin logs in
    ↓
Firebase Authentication
    ↓
Dashboard shows all screens
    ↓
Admin selects screen to edit
    ↓
Screen Editor loads config
    ↓
Admin makes changes
    ↓
Save to Firestore
    ↓
Display updates in real-time
```

## State Management

The app uses React's built-in state management:

- **Component State** (`useState`) - Local UI state
- **Effect Hooks** (`useEffect`) - Side effects and data fetching
- **Props** - Data passing between components
- **Firebase Real-time** - Server state synchronization

No external state library (Redux, MobX) is needed for this application size.

## Routing Strategy

React Router with **Hash Routing** for compatibility:

```typescript
<HashRouter>
  <Routes>
    <Route path="/screen/:screenId" element={<DisplayPage />} />
    <Route path="/admin/login" element={<LoginPage />} />
    <Route path="/admin/dashboard" element={<DashboardPage />} />
    <Route path="/admin/screen/:screenId" element={<ScreenEditorPage />} />
  </Routes>
</HashRouter>
```

Hash routing ensures proper navigation even on simple hosting.

## Security Architecture

### Authentication
- Firebase Auth handles user identity
- Google sign-in or email/password
- JWT tokens for API requests

### Authorization
- Firestore security rules enforce access control
- Public read for display screens
- Authenticated write for admin operations

### Data Validation
- TypeScript ensures type safety
- Firestore rules validate data structure
- Client-side validation in forms

## Scalability

### Horizontal Scalability
- Each club gets isolated data
- Firebase auto-scales
- CDN distributes assets globally

### Performance Optimization
- Code splitting (lazy loading)
- Asset optimization (Vite)
- Firestore indexes for fast queries
- Local caching where appropriate

## Next Steps

- [Frontend Architecture](frontend.md)
- [Backend Services](backend.md)
- [Database Schema](database.md)
