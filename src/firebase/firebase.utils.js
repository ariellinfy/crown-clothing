import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA9fODD0PVEdVQvs58GA2I68qnPtzlSWeo",
    authDomain: "crwn-db-eee3e.firebaseapp.com",
    databaseURL: "https://crwn-db-eee3e.firebaseio.com",
    projectId: "crwn-db-eee3e",
    storageBucket: "crwn-db-eee3e.appspot.com",
    messagingSenderId: "582600060657",
    appId: "1:582600060657:web:5a0d217b998a4b84334350"
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;