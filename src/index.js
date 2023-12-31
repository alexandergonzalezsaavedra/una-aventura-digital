import React from 'react';
import ReactDOM from 'react-dom/client';
// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Redux Tooltik
import { store } from './App/store'
import { Provider } from 'react-redux'
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
// Local
import './index.css';
import App from './App';
//Render
const root = ReactDOM.createRoot(document.getElementById('root'));

const firebaseConfig = {
  apiKey: "AIzaSyDHpU08VIjMie50i4glYpjQ4ekVvy-Jlj0",
  authDomain: "db-aventura-digital.firebaseapp.com",
  databaseURL: "https://db-aventura-digital-default-rtdb.firebaseio.com",
  projectId: "db-aventura-digital",
  storageBucket: "db-aventura-digital.appspot.com",
  messagingSenderId: "115172563488",
  appId: "1:115172563488:web:a72529f5c86c44c0103a45"
}
let firebaseApp = initializeApp(firebaseConfig)
let db = getFirestore(firebaseApp)
export { db }


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);