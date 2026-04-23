<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6b2216cf-5795-4228-a3e7-bb0e034100bd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Admin Authorization Model

Admin access now uses Firebase custom claims as the primary authorization source.
A single legacy hardcoded admin email fallback is still enabled for continuity.

- Primary admin check: Firebase custom claim `admin: true` or `role: 'admin'`
- Legacy fallback: `chailey33@gmail.com` with verified email

### Grant/Revoke Process (With Approval)

1. Obtain approval from two people:
    - Security owner
    - Engineering owner
2. Record the change request ticket and reason.
3. Run the role update using Firebase Admin SDK from a secure environment.
4. Save evidence of who approved, who executed, when, and for which UID.

Example script:

```js
import admin from 'firebase-admin';

admin.initializeApp({
   credential: admin.credential.applicationDefault(),
   projectId: process.env.FIREBASE_PROJECT_ID,
});

const uid = process.argv[2];
const action = process.argv[3]; // grant or revoke

if (!uid || !['grant', 'revoke'].includes(action)) {
   throw new Error('Usage: node scripts/set-admin.mjs <uid> <grant|revoke>');
}

if (action === 'grant') {
   await admin.auth().setCustomUserClaims(uid, { admin: true, role: 'admin' });
   console.log(`Granted admin claims for ${uid}`);
} else {
   await admin.auth().setCustomUserClaims(uid, { admin: false, role: 'user' });
   console.log(`Revoked admin claims for ${uid}`);
}
```

After updating claims, the user must refresh their auth token (sign out/in, or token refresh) for changes to take effect.
