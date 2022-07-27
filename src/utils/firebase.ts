import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBecx3A3MkTOKQERtZC0hL1SrqNfV_3IAA',
  authDomain: 'ecoleta-360b8.firebaseapp.com',
  projectId: 'ecoleta-360b8',
  storageBucket: 'ecoleta-360b8.appspot.com',
  messagingSenderId: '402985254959',
  appId: '1:402985254959:web:05b8b6793d9785038f06da',
  measurementId: 'G-3J74LMZ4DV',
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
