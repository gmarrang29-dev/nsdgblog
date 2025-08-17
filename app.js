
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";

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
  const provider = new GoogleAuthProvider();
  const loginBtn = document.getElementById('loginBtn');


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


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("로그인 상태 확인됨. 페이지를 이동합니다.");
    window.location.href = "index.html";
  } else {
    console.log("현재 로그아웃 상태입니다.");
  }
});