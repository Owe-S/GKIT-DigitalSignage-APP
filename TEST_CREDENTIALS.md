# Test Login Credentials

## Admin Login

Since Google Workspace login may not be working, use these test credentials:

**Email:** `test@golfklubb-it.com`  
**Password:** `TestGKIT2025!`

### How to Create the Test User

1. Go to [Firebase Console](https://console.firebase.google.com/project/loftlogic-display/authentication/users)
2. Click **"Add user"**
3. Enter:
   - **Email:** `test@golfklubb-it.com`
   - **Password:** `TestGKIT2025!`
4. Click **"Add user"**

### After Creating the User

You also need to create a user profile in Firestore:

1. Go to [Firestore Database](https://console.firebase.google.com/project/loftlogic-display/firestore/databases/-default-/data)
2. Click **"Start collection"**
3. Collection ID: `users`
4. Document ID: `[use the UID from Firebase Auth]`
5. Add fields:
   - **name** (string): `Test Admin`
   - **email** (string): `test@golfklubb-it.com`
   - **clubId** (string): `skigk`
   - **clubName** (string): `Ski Golfklubb`

### Login URL

[https://gkit-digital-signage.web.app/#/admin/login](https://gkit-digital-signage.web.app/#/admin/login)

---

**Note:** You need to create this user manually in Firebase Console as we cannot programmatically create users without Firebase Admin SDK.
