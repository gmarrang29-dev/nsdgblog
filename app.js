// login.js

import { auth } from './firebase-config.js'; 
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log("로그인 성공!", result.user.displayName);
    })
    .catch(error => {
      console.error("로그인 에러:", error);
    });
});

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "index.html";
  }
});