const firebaseConfig = {
  apiKey: "AIzaSyCprJ7OCC3xWS3cgfnqvbf4ea5rObp1Jq4",
  authDomain: "ckatdush.net",
  projectId: "artan-86cc0",
  storageBucket: "artan-86cc0.firebasestorage.app",
  messagingSenderId: "286877258345",
  appId: "1:286877258345:web:44c333a92e057831be48f8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
