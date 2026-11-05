import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

/**
 * Firebase web configuration read from EXPO_PUBLIC_* environment variables.
 * These are public client identifiers (not secrets). Service-account keys and
 * backend credentials are intentionally never used in this app.
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let initError: string | null = null;

if (missingKeys.length > 0) {
  initError = `Missing Firebase configuration: ${missingKeys.join(', ')}. Copy .env.example to .env, fill in the values, and restart Expo.`;
} else {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (e) {
    initError = `Firebase failed to initialize: ${e instanceof Error ? e.message : String(e)}`;
  }
}

export { auth, firebaseConfig, initError as firebaseInitError };
export const isFirebaseReady = auth !== null;
