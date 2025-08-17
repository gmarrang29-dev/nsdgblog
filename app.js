// =================================================================
// 1. 필요한 모든 도구들을 정확하게 불러옵니다. (수정된 부분!)
// =================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// analytics는 지금 당장 필요 없으니, auth 관련 기능들을 불러옵니다.
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// =================================================================
// 2. 파이어베이스 비밀 열쇠 (이 부분은 그대로 두세요)
// =================================================================
const firebaseConfig = {
  apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
  authDomain: "nsdgblog-42b3e.firebaseapp.com",
  projectId: "nsdgblog-42b3e",
  storageBucket: "nsdgblog-42b3e.appspot.com", // storageBucket 주소에 .firebase 가 아닌 .appspot.com 이 맞습니다.
  messagingSenderId: "540516487909",
  appId: "1:540516487909:web:1f755b7fcb2935aa2dba0c",
  measurementId: "G-D2CHDR4QGN"
};

// =================================================================
// 3. 파이어베이스를 초기 설정하고, '인증 관리자'를 임명합니다. (수정된 부분!)
// =================================================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // <-- 이 줄이 추가되었습니다!
const provider = new GoogleAuthProvider();

// =================================================================
// 4. HTML의 '구글로 로그인' 버튼을 가져옵니다. (이 부분은 그대로 두세요)
// =================================================================
const loginBtn = document.getElementById('loginBtn');

// =================================================================
// 5. 로그인 버튼 클릭 시 행동 (이 부분은 그대로 두세요)
// =================================================================
loginBtn.addEventListener('click', () => {
  console.log("로그인 버튼 클릭됨!");
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("로그인 성공! 환영합니다.", result.user.displayName, "님");
    })
    .catch((error) => {
      console.error("로그인 중 에러 발생:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    });
});

// =================================================================
// 6. 로그인 상태 감시자 (이 부분은 그대로 두세요)
// =================================================================
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("로그인 상태 확인됨. 페이지를 이동합니다.");
    // 로그인 페이지가 index.html 이라면, 로그인 성공 후 main.html 등으로 이동해야 합니다.
    window.location.href = "main.html";
  } else {
    console.log("현재 로그아웃 상태입니다.");
  }
});