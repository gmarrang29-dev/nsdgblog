import { auth } from './firebase-config.js'; 
import { GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
const loginBtn = document.getElementById('loginBtn');
const guestBtn = document.getElementById('guest');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log("구글 로그인 성공:", result.user.displayName);
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error("구글 로그인 에러:", error);
      });
  });
}

if (guestBtn) {
  guestBtn.addEventListener('click', () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("게스트 로그인 성공");
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error("게스트 로그인 에러:", error);
      });
  });
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log(user.isAnonymous ? "게스트 로그인 상태" : "구글 로그인 상태");
  }
});
