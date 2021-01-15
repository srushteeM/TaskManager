import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAdBcCvb71IpIpYgjANO1EzIyMkkFMgnPk",
  authDomain: "pesonalreminder.firebaseapp.com",
  databaseURL: "https://pesonalreminder.firebaseio.com",
  projectId: "pesonalreminder",
  storageBucket: "pesonalreminder.appspot.com",
  messagingSenderId: "90439462035",
  appId: "1:90439462035:web:324c5a8d4868bb7b117166",
  measurementId: "G-L6DGKJTDWS"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
