import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const clean = (val?: string) => (val || '').trim().replace(/,$/, '');

console.log("Firebase env:", {
  apiKey: Boolean(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: Boolean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  appId: Boolean(import.meta.env.VITE_FIREBASE_APP_ID),
});

export const firebaseConfig = {
  apiKey: clean(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: clean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: clean(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  appId: clean(import.meta.env.VITE_FIREBASE_APP_ID),
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);



