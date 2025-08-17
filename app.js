import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
    authDomain: "nsdgblog-42b3e.firebaseapp.com",
    projectId: "nsdgblog-42b3e",
    storageBucket: "nsdgblog-42b3e.firebasestorage.app",
    messagingSenderId: "540516487909",
    appId: "1:540516487909:web:1f755b7fcb2935aa2dba0c",

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("로그인 성공! 환영합니다.", result.user.displayName, "님");
    })
    .catch((error) => {
      console.error("로그인 중 에러 발생:", error);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});