// firebase-config.js

// 필요한 함수들을 SDK에서 가져옵니다.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 학생의 웹 앱 Firebase 설정 정보
const firebaseConfig = {
    apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
    authDomain: "nsdgblog-42b3e.firebaseapp.com",
    projectId: "nsdgblog-42b3e",
    storageBucket: "nsdgblog-42b3e.firebasestorage.app",
    messagingSenderId: "540516487909",
    appId: "1:540516487909:web:1f755b7fcb2935aa2dba0c",
    measurementId: "G-D2CHDR4QGN"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 다른 파일에서 사용할 수 있도록 인증(auth)과 Firestore(db) 객체를 내보냅니다(export).
export const auth = getAuth(app);
export const db = getFirestore(app);