// firebase-config.js

// 1. 필요한 Firebase 기능들을 불러옵니다.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 2. 내 Firebase 프로젝트의 고유 주소와 비밀 키 정보입니다.
const firebaseConfig = {
    apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
    authDomain: "nsdgblog-42b3e.firebaseapp.com",
    projectId: "nsdgblog-42b3e",
    storageBucket: "nsdgblog-42b3e.firebasestorage.app",
    messagingSenderId: "540516487909",
    appId: "1:540516487909:web:1f755b7fcb2935aa2dba0c",
    measurementId: "G-D2CHDR4QGN"
};

// 3. 설정 정보를 이용해 Firebase 서버에 연결합니다.
const app = initializeApp(firebaseConfig);

// 4. 바로 이 'export' 키워드가 가장 중요합니다!
// 이 키워드가 있어야 다른 파일에서 auth와 db를 import 할 수 있습니다.
export const auth = getAuth(app);
export const db = getFirestore(app);