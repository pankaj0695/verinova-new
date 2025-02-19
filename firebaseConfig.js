import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB2q1pg2uozDPBINRzD94hTaPGD8_kyqe8',
  authDomain: 'verinova-app.firebaseapp.com',
  projectId: 'verinova-app',
  storageBucket: 'verinova-app.firebasestorage.app',
  messagingSenderId: '531938835062',
  appId: '1:531938835062:android:58e0ef63d07385089d3d57',
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {firebaseApp, auth};
