import firebase from "firebase/compat";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC06JbhF5nPQ9hPiHw6x9e7IFB5NWOmR0w",
    authDomain: "weatherapp-73673.firebaseapp.com",
    projectId: "weatherapp-73673",
    storageBucket: "weatherapp-73673.appspot.com",
    messagingSenderId: "305710955671",
    appId: "1:305710955671:web:2cbd0ef90b1e3144967dd2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();