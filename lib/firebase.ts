import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// auto-detect long-polling: some networks (corporate proxies, some browser
// automation contexts) kill the WebChannel streaming connection outright.
// initializeFirestore throws if already called for this app (HMR re-runs
// this module) — fall back to the existing instance in that case.
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch {
  firestoreDb = getFirestore(app);
}
export const db = firestoreDb;

export const auth = getAuth(app);
