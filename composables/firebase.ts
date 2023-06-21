import { initializeApp, getApps } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyCThkB9-GPLM45G9aFQfHm0oerXCFxJbR4",
  authDomain: "notepad-96add.firebaseapp.com",
  projectId: "notepad-96add",
  storageBucket: "notepad-96add.appspot.com",
  messagingSenderId: "331171673427",
  appId: "1:331171673427:web:da4967ebbcb47b54bd9da6",
};

export const firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Can only run in browser
export function getFireStore(): Firestore {
  if (typeof window !== "undefined") {
    const appCheck = initializeAppCheck(firebase_app, {
      provider: new ReCaptchaV3Provider(
        "6LeIsXYeAAAAAObgcWGuMGqLdNvp86fVIrlhcg1x"
      ),
      isTokenAutoRefreshEnabled: true,
    });
  }

  return getFirestore(firebase_app);
}
