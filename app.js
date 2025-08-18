// login.js

// 1. 설정 보관함에서 'auth' 기능만 쏙 빼서 가져오기
import { auth } from './firebase-config.js'; 
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
const loginBtn = document.getElementById('loginBtn');

// 2. 로그인 버튼 기능 실행 (초기화 코드가 없어져서 깔끔해짐)
loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log("로그인 성공!", result.user.displayName);
    })
    .catch(error => {
      console.error("로그인 에러:", error);
    });
});

// 3. 로그인 상태 감시
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "index.html";
  }
});