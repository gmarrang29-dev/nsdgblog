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

// 2. 파이어베이스 초기화
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// 3. HTML에서 로그인 버튼 가져오기
const loginBtn = document.getElementById('loginBtn');

// 4. 로그인 버튼 클릭하면?
loginBtn.addEventListener('click', () => {
  // 팝업창으로 구글 로그인 시도
  auth.signInWithPopup(provider)
    .then((result) => {
      // 성공했을 때의 처리는 아래 onAuthStateChanged에서!
      console.log("로그인 성공!", result.user);
    })
    .catch((error) => {
      // 실패하면 에러를 보여줌
      console.error("로그인 실패 ㅠㅠ", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    });
});

// 5. 로그인 상태 감시자 (가장 중요!)
auth.onAuthStateChanged((user) => {
  if (user) {
    // 사용자가 로그인된 상태라면?
    // main.html 페이지로 즉시 이동!
    console.log("로그인 상태입니다. 메인 페이지로 이동합니다.");
    window.location.href = "main.html"; // <-- 로그인 후 이동할 페이지 주소
  } else {
    // 사용자가 로그아웃된 상태라면?
    // 로그인 페이지에 머무름
    console.log("로그아웃 상태입니다.");
  }
});