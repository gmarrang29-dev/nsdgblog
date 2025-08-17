// =================================================================
// 1. 필요한 모든 도구들을 정확하게 불러옵니다. (GoogleAuthProvider 추가!)
// =================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// =================================================================
// 2. 파이어베이스 프로젝트의 비밀 열쇠
// =================================================================
const firebaseConfig = {
  apiKey: "여기에_복사한_apiKey_붙여넣기",
  authDomain: "여기에_복사한_authDomain_붙여넣기",
  projectId: "여기에_복사한_projectId_붙여넣기",
  storageBucket: "여기에_복사한_storageBucket_붙여넣기",
  messagingSenderId: "여기에_복사한_messagingSenderId_붙여넣기",
  appId: "여기에_복사한_appId_붙여넣기"
};

// =================================================================
// 3. 파이어베이스 초기 설정 및 도구 준비
// =================================================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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