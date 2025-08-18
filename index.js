document.getElementById('write-btn').addEventListener('click', () => {
    window.location.href = "write.html";
});

// index.js

// 1. firebase-config.js에서 만들어둔 auth와 db 객체를 가져옵니다.
import { auth, db } from './firebase-config.js';

// 2. 이제 Firebase SDK에서 필요한 다른 함수들을 가져옵니다.
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, query, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 3. 이제 바로 auth와 db 변수를 사용해서 코드를 작성하면 됩니다.
// 예: onAuthStateChanged(auth, (user) => { ... });import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// ... (initializeApp, getAuth 등)

const db = getFirestore(app);

// Firestore에서 글 목록을 가져오는 함수
async function fetchPosts() {
    const postList = document.querySelector('.post-list');
    postList.innerHTML = ''; // 기존 목록 비우기

    // 'posts' 컬렉션의 모든 문서를 'createdAt' 필드를 기준으로 내림차순(최신순)으로 정렬하여 가져옵니다.
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        const post = doc.data(); // 각 문서의 데이터 (제목, 내용 등)
        const postId = doc.id; // 문서의 고유 ID

        // 목록에 표시할 HTML 요소를 만듭니다.
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        
        // Firestore에서 가져온 날짜(Timestamp)를 'YYYY.MM.DD' 형식으로 변환
        const date = post.createdAt.toDate();
        const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        
        listItem.innerHTML = `
            <a href="#" class="post-title-link" data-post-id="${postId}">${post.title}</a>
            <div class="post-meta">
                <span class="author">작성자: ${post.author}</span> |
                <span class="date">작성일: ${formattedDate}</span>
            </div>
        `;
        postList.appendChild(listItem);
    });
}

// 페이지가 로드되면 글 목록을 불러옵니다.
window.onload = fetchPosts;