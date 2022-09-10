// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYK-57m32zuxA26deDiCMI2PpT_vqyDpk',
  authDomain: 'review-ambassador.firebaseapp.com',
  projectId: 'review-ambassador',
  storageBucket: 'review-ambassador.appspot.com',
  messagingSenderId: '444344564638',
  appId: '1:444344564638:web:9f1af82a8fcae3ac0ef48f',
  measurementId: 'G-H6R2TTK8QK'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

// // Import the functions you need from the SDKs you need
// import Firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: '',
//   authDomain: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: '',
//   measurementId: ''
// }

// // Initialize Firebase
// if (!Firebase.apps.length) {
//   Firebase.initializeApp(firebaseConfig)
// }

// export default Firebase
