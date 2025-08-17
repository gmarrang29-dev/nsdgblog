// =================================================================
// 1. 필요한 모든 도구들을 정확하게 불러옵니다. (GoogleAuthProvider 추가!)
// =================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// =================================================================
// 2. 파이어베이스 프로젝트의 비밀 열쇠
// =================================================================
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
    authDomain: "nsdgblog-42b3e.firebaseapp.com",
    projectId: "nsdgblog-42b3e",
    storageBucket: "nsdgblog-42b3e.firebasestorage.app",
    messagingSenderId: "540516487909",
    appId: "1:540516487909:web:1f755b7fcb2935aa2dba0c",
    measurementId: "G-D2CHDR4QGN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const provider = new GoogleAuthProvider(); // 이제 이 코드가 정상적으로 작동합니다.

// =================================================================
// 4. HTML의 '구글로 로그인' 버튼 가져오기
// =================================================================
const loginBtn = document.getElementById('loginBtn');

// =================================================================
// 5. '구글로 로그인' 버튼 클릭 시 행동 정의
// =================================================================
loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("로그인 성공! 환영합니다.", result.user.displayName, "님");
    })
    .catch((error) => {
      console.error("로그인 중 에러 발생:", error);
    });
});

// =================================================================
// 6. 로그인 상태 감시자
// =================================================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 로그인 성공 시 'main.html' 페이지로 이동
    window.location.href = "main.html";
  }
});