import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import { getFirestore} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyAN4WAxsXTZF5dvjBHueWJyGlzUOrzFYno",
    authDomain: "dthanhff-music-lofi.firebaseapp.com",
    projectId: "dthanhff-music-lofi",
    storageBucket: "dthanhff-music-lofi.appspot.com",
    messagingSenderId: "225870406688",
    appId: "1:225870406688:web:7ede99604c6854ed704845",
    measurementId: "G-S3YZTYTX7C"
    };
// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase)


