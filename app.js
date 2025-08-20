import { auth } from './firebase-config.js'; 
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log("로그인 성공!", result.user.displayName);
      })
      .catch(error => {
        console.error("로그인 중 에러 발생:", error);
      });
  });
}

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "index.html";
  }
});