// src/services/firebase/firebase.config.ts

/**
 * Firebase initialization — only called when EXPO_PUBLIC_AUTH_PROVIDER=firebase.
 *
 * Requires:
 *   npx expo install @react-native-firebase/app
 *
 * Android: place google-services.json in /android/app/
 * iOS:     place GoogleService-Info.plist in /ios/
 */

let initialized = false;

export function initializeFirebase(): void {
  if (initialized) return;

  try {
    const { default: firebase } = require("@react-native-firebase/app");

    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }

    initialized = true;
  } catch (error) {
    console.warn(
      "[firebase.config] Firebase not initialized. " +
        "Make sure @react-native-firebase/app is installed and " +
        "EXPO_PUBLIC_AUTH_PROVIDER=firebase is set.",
      error
    );
  }
}

export function isFirebaseInitialized(): boolean {
  return initialized;
}
