import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1e7x486lSoqfbTxWV7UVaVJGhBYQpkfw",
    authDomain: "mapa-inteligente-bad19.firebaseapp.com",
    projectId: "mapa-inteligente-bad19",
    storageBucket: "mapa-inteligente-bad19.firebasestorage.app",
    messagingSenderId: "202287431904",
    appId: "1:202287431904:web:f17ecb399b177cebc35085"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;    