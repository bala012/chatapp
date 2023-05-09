import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyC4xUS8OMyA6SgPfBj4FZZhXSkRAnCdh8M",
  authDomain: "chatapp-ba404.firebaseapp.com",
  projectId: "chatapp-ba404",
  storageBucket: "chatapp-ba404.appspot.com",
  messagingSenderId: "170189669587",
  appId: "1:170189669587:web:0fbc576c9de6a403ec4026"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =  firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider }
  export default db 