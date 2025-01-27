import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
// });

export { auth,  };
