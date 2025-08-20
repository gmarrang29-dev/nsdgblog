import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// firebase-config.js에서 필요한 모든 것을 가져옵니다.
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
authDomain: "nsdgblog-42b3e.firebaseapp.com",
projectId: "nsdgblog-42b3e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

const titleInput = document.getElementById('title-input');
// ... (이하 동일)
const contentInput = document.getElementById('content-input');
const saveBtn = document.getElementById('save-btn');

onAuthStateChanged(auth, (user) => {
    if (user) {
        saveBtn.disabled = false;
    } else {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
    }
});

saveBtn.addEventListener('click', async () => {
    const user = auth.currentUser; 
    if (!user) {
        alert("로그인이 필요합니다.");
        return;
    }

    const title = titleInput.value;
    const content = contentInput.value;

    if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
    }

    try {
        await addDoc(collection(db, "posts"), {
            title: title,
            content: content,
            author: user.displayName, 
            authorEmail: user.email,
            createdAt: serverTimestamp() 
        });
        
        alert("글이 성공적으로 저장되었습니다!");
        window.location.href = "index.html"; 

    } catch (error) {
        console.error("글 저장 중 오류 발생:", error);
        alert("글 저장에 실패했습니다.");
    }
});