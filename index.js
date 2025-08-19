// index.js

// 1. 필요한 모든 기능들을 맨 위에서 한번에 불러옵니다.
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, query, orderBy, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 2. 사용할 HTML 요소들을 미리 찾아 변수에 저장합니다.
const postList = document.querySelector('.post-list');
const writeBtn = document.getElementById('write-btn');
const headerLoginLink = document.querySelector('header a[href="login.html"]');
const writeButtonContainer = document.querySelector('.main-actions');

// 3. 글 목록을 DB에서 가져와 화면에 표시하는 함수
async function fetchPosts() {
    postList.innerHTML = '';
    const currentUser = auth.currentUser;

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        const date = post.createdAt.toDate();
        const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        let buttonsHTML = '';
        if (currentUser && currentUser.email === post.authorEmail) {
            buttonsHTML = `
                <div class="post-buttons">
                    <button onclick="editPost('${postId}')">수정</button>
                    <button onclick="deletePost('${postId}')">삭제</button>
                </div>
            `;
        }
        listItem.innerHTML = `
            <a href="#" class="post-title-link" data-post-id="${postId}">${post.title}</a>
            <div class="post-meta">
                <span class="author">작성자: ${post.author}</span> |
                <span class="date">작성일: ${formattedDate}</span>
            </div>
            ${buttonsHTML}
        `;
        postList.appendChild(listItem);
    });
}

// 4. 로그인 상태에 따라 UI를 변경하는 함수
function updateLoginUI(user) {
    if (user) {
        headerLoginLink.innerHTML = `${user.displayName}님 <button id="logout-btn">로그아웃</button>`;
        writeButtonContainer.style.display = 'block';
        document.getElementById('logout-btn').addEventListener('click', () => {
            signOut(auth);
        });
    } else {
        headerLoginLink.innerHTML = '<a href="login.html">로그인</a>';
        writeButtonContainer.style.display = 'none';
    }
    fetchPosts();
}

// 5. 글 삭제/수정 함수
window.deletePost = async (postId) => {
    if (confirm("정말 삭제하시겠습니까?")) {
        try {
            await deleteDoc(doc(db, "posts", postId));
            fetchPosts();
        } catch (error) {
            console.error("삭제 중 오류 발생: ", error);
        }
    }
};
window.editPost = (postId) => {
    window.location.href = `write.html?id=${postId}`;
};

// 6. 페이지의 모든 기능을 시작시키는 '메인 스위치' 함수
function initializePage() {
    // 글쓰기 버튼 이벤트
    writeBtn.addEventListener('click', () => {
        window.location.href = "write.html";
    });

    // 글 제목 클릭 이벤트 (이벤트 위임)
    postList.addEventListener('click', (event) => {
        // 클릭된 것이 제목 링크('.post-title-link')가 맞는지 확인
        if (event.target.classList.contains('post-title-link')) {
            const postId = event.target.dataset.postId;
            // 상세 내용을 보여주는 대신, detail.html 페이지로 ID를 가지고 이동
            window.location.href = `detail.html?id=${postId}`;
        }
    });

    // 로그인 상태 변화 감시 시작
    onAuthStateChanged(auth, updateLoginUI);
}

// 페이지가 로드되자마자 모든 설정을 시작합니다.
initializePage();