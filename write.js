// app.js에서 썼던 설정과 함수들을 가져옵니다.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
// Firestore를 사용하기 위한 함수들을 가져옵니다.
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    // app.js에 있던 설정 그대로 복사
    apiKey: "AIzaSyBEMuXpcTWRGj7gQzrTNlTY-yYQm33J36s",
    authDomain: "nsdgblog-42b3e.firebaseapp.com",
    projectId: "nsdgblog-42b3e",
    // ... 나머지 설정도 그대로
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore DB 객체 생성

const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');
const saveBtn = document.getElementById('save-btn');

// 사용자가 로그인했는지 확인
onAuthStateChanged(auth, (user) => {
    if (user) {
        // 로그인한 사용자일 때만 저장 버튼 활성화
        saveBtn.disabled = false;
    } else {
        // 로그인 안 했으면 로그인 페이지로 보내기
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
    }
});

// 저장 버튼 클릭 이벤트
saveBtn.addEventListener('click', async () => {
    const user = auth.currentUser; // 현재 로그인한 사용자 정보 가져오기
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
        // 'posts'라는 이름의 컬렉션(폴더)에 새 문서를 추가합니다.
        await addDoc(collection(db, "posts"), {
            title: title,
            content: content,
            author: user.displayName, // 작성자 이름
            authorEmail: user.email, // 작성자 이메일
            createdAt: serverTimestamp() // 현재 시간 서버 기준으로 기록
        });
        
        alert("글이 성공적으로 저장되었습니다!");
        window.location.href = "index.html"; // 저장 후 메인 페이지로 이동

    } catch (error) {
        console.error("글 저장 중 오류 발생:", error);
        alert("글 저장에 실패했습니다.");
    }
});