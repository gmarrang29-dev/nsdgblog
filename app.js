// app.js (또는 login.js) - 전체 최종 코드

// 1. firebase-config.js에서 '인증' 기능을 가져옵니다.
import { auth } from './firebase-config.js'; 

// 2. Firebase SDK에서 구글 로그인에 필요한 도구들을 모두 가져옵니다. (이 부분이 문제의 원인일 가능성이 높습니다)
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// 3. 구글 로그인 방식을 사용하도록 설정합니다.
const provider = new GoogleAuthProvider();

// 4. HTML에서 로그인 버튼을 찾습니다.
const loginBtn = document.getElementById('loginBtn');

// 5. 로그인 버튼이 존재할 경우에만 클릭 이벤트를 추가합니다.
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    // 클릭 시 구글 로그인 팝업창을 띄웁니다.
    signInWithPopup(auth, provider)
      .then(result => {
        console.log("로그인 성공!", result.user.displayName);
        // 성공하면 아래 onAuthStateChanged가 알아서 index.html로 보내줍니다.
      })
      .catch(error => {
        console.error("로그인 중 에러 발생:", error);
      });
  });
}

// 6. 로그인 상태를 실시간으로 감시합니다.
onAuthStateChanged(auth, user => {
  // 사용자가 로그인된 상태라면,
  if (user) {
    // 메인 페이지로 이동시킵니다.
    window.location.href = "index.html";
  }
});