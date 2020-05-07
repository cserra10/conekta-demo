import React from 'react';
import Routes from './Routes'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCvli1m6hwjSEeztBAUrbIEx2QMf6fM6y8",
  authDomain: "workshop-conekta.firebaseapp.com",
  databaseURL: "https://workshop-conekta.firebaseio.com",
  projectId: "workshop-conekta",
  storageBucket: "workshop-conekta.appspot.com",
  messagingSenderId: "724312498679",
  appId: "1:724312498679:web:78fa0597a565a86f918ef2",
  measurementId: "G-E69LR3D8V7"
}

firebase.initializeApp(firebaseConfig)

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  )
}

export default App
