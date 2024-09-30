import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 

// Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyAVoD7QBePIw3RZi1L1jlnAZJw6_8ypkro", 
  authDomain: "test-task-cfed0.firebaseapp.com", 
  projectId: "test-task-cfed0", 
  storageBucket: "test-task-cfed0.appspot.com", 
  messagingSenderId: "882867081362", 
  appId: "1:882867081362:web:cd7c67780517ebf957d64b", 
  measurementId: "G-7427GRZVR2", 
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get the Firebase authentication instance associated with the app
const auth = getAuth(app);

// Create a GoogleAuthProvider instance to enable Google sign-in
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup }; // Exporting auth, Google provider, and signInWithPopup function for use in other components
