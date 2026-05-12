import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDofw-R5hdWdo9xfGbJdHqgXSDzjpmKhYs",
//   authDomain: "e-commerce-48260.firebaseapp.com",
//   // authDomain: "royalcartx.com",

//   projectId: "e-commerce-48260",
//   appId: "1:114759704454:web:919deb8ff89317d9111607",
// };

const firebaseConfig = {
  apiKey:      import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:   import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId:       import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();