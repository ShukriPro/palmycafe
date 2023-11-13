import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB57y03E20hHHi_xJY47o7r9ITp2Qrp1Ec",
  authDomain: "palmycafe-c9e52.firebaseapp.com",
  projectId: "palmycafe-c9e52",
  storageBucket: "palmycafe-c9e52.appspot.com",
  messagingSenderId: "627007815672",
  appId: "1:627007815672:web:8b15d027ffc6e80bda200d",
  measurementId: "G-ZQZZ4PMQM4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };