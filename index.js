// index.js

// 1. 필요한 모든 기능들을 맨 위에서 한번에 불러옵니다.
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// --- 수정된 부분 --- : getDoc 함수를 추가로 가져옵니다.
import { collection, query, orderBy, getDocs, doc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 2. 사용할 HTML 요소들을 미리 찾아둡니다.
const postList = document.querySelector('.post-list');
const writeBtn = document.getElementById('write-btn');
const headerLoginLink = document.querySelector('header a[href="login.html"]');
const writeButtonContainer = document.querySelector('.main-actions');

// --- 추가된 부분 --- : 상세 보기 관련 HTML 요소들을 찾아둡니다.
const postListSection = document.getElementById('post-list-section');
const postDetailSection = document.getElementById('post-detail-section');
const backToListBtn = document.getElementById('back-to-list-btn');


// 3. 글 목록을 DB에서 가져와 화면에 표시하는 함수 (기존과 동일)
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

// --- 추가된 부분 --- : 특정 글 하나의 상세 내용을 보여주는 함수
async function showPostDetail(postId) {
    // 1. Firestore에서 특정 ID의 문서 하나를 지정합니다.
    const docRef = doc(db, "posts", postId);
    // 2. 지정된 문서를 DB에서 가져옵니다.
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const post = docSnap.data();

        // 3. 상세 보기 섹션의 각 부분에 데이터를 채워넣습니다.
        document.getElementById('post-detail-title').textContent = post.title;
        document.getElementById('post-detail-author').textContent = `작성자: ${post.author}`;
        const date = post.createdAt.toDate();
        const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        document.getElementById('post-detail-date').textContent = `작성일: ${formattedDate}`;
        // 사용자가 입력한 줄바꿈(\n)을 HTML의 줄바꿈(<br>)으로 바꿔서 표시합니다.
        document.getElementById('post-detail-text').innerHTML = post.content.replace(/\n/g, '<br>');

        // 4. 글 목록은 숨기고, 상세 보기 섹션을 보여줍니다.
        postListSection.style.display = 'none';
        postDetailSection.style.display = 'block';

    } else {
        console.log("해당 문서가 없습니다!");
        alert("삭제되었거나 존재하지 않는 게시글입니다.");
    }
}


// 4. 로그인 상태에 따라 UI를 변경하는 함수 (기존과 동일)
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

// 5. 글 삭제/수정 함수 (기존과 동일)
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
    writeBtn.addEventListener('click', () => {
        window.location.href = "write.html";
    });

    // --- 추가된 부분 --- : 목록으로 돌아가기 버튼 기능
    backToListBtn.addEventListener('click', () => {
        postDetailSection.style.display = 'none';
        postListSection.style.display = 'block';
    });

    // --- 추가된 부분 --- : 글 제목 클릭 기능 (이벤트 위임 방식)
    postList.addEventListener('click', (event) => {
        // 클릭된 것이 'post-title-link' 클래스를 가진 제목 링크인지 확인
        if (event.target.classList.contains('post-title-link')) {
            const postId = event.target.dataset.postId;
            showPostDetail(postId);
        }
    });

    onAuthStateChanged(auth, updateLoginUI);
}

// 페이지가 로드되자마자 모든 설정을 시작합니다.
initializePage();