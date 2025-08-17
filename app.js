// 1. 파이어베이스 기능들을 딱 한 번만 불러옵니다.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// 2. 파이어베이스 비밀 열쇠
const firebaseConfig = {
    apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
    authDomain: "nsdgblog-42b3e.firebaseapp.com",
    projectId: "nsdgblog-42b3e",
    storageBucket: "nsdgblog-42b3e.firebasestorage.app",
    messagingSenderId: "540516487909",
    appId: "1:540516487909:web:1f755b7fcb2935aa2dba0c",

};

// 3. 파이어베이스 앱을 딱 한 번만 초기화합니다.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 4. HTML의 '구글로 로그인' 버튼 가져오기
const loginBtn = document.getElementById('loginBtn');

// 5. '구글로 로그인' 버튼 클릭 시 행동 정의
loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("로그인 성공! 환영합니다.", result.user.displayName, "님");
    })
    .catch((error) => {
      console.error("로그인 중 에러 발생:", error);
    });
});

// 6. 로그인 상태 감시자
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 로그인 성공 시 'main.html' 페이지로 이동
    window.location.href = "main.html";
  }
});