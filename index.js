import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, getDocs, query, orderBy, startAt, endAt } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// HTML 요소를 정확한 선택자로 다시 선언합니다.
const headerLoginLink = document.querySelector('header a[href="login.html"]');
const writeButtonContainer = document.querySelector('.main-actions');
const postList = document.querySelector('.post-list');
const searchForm = document.querySelector('.search-box form');
const searchInput = document.querySelector('.search');
const writeBtn = document.getElementById('write-btn');

async function fetchPosts() {
    postList.innerHTML = '';
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
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

async function searchPosts(keyword) {
    postList.innerHTML = '';
    const postsRef = collection(db, "posts");
    const q = query(
        postsRef,
        orderBy("title"),
        startAt(keyword),
        endAt(keyword + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        postList.innerHTML = '<li>검색 결과가 없습니다.</li>';
        return;
    }

    querySnapshot.forEach((docSnap) => {
        const post = docSnap.data();
        const postId = docSnap.id;
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
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

function initializePage() {
    // 검색은 버튼 클릭이 아닌 form 제출(submit) 이벤트로 처리하는 것이
    // 엔터 키와 검색 버튼 클릭을 모두 잡을 수 있어 더 효율적입니다.
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // form 제출 시 페이지가 새로고침되는 것을 막습니다.
        const keyword = searchInput.value.trim();
        if (keyword) {
            searchPosts(keyword);
        } else {
            fetchPosts();
        }
    });
    
    if(writeBtn) {
        writeBtn.addEventListener('click', () => {
            window.location.href = "write.html";
        });
    }

    postList.addEventListener('click', (event) => {
        if (event.target.classList.contains('post-title-link')) {
            event.preventDefault();
            const postId = event.target.getAttribute('data-post-id');
            if (postId) {
                window.location.href = `detail.html?id=${postId}`;
            }
        }
    });

    function updateLoginUI(user) {
        if (user) {
            if (user.isAnonymous) {
                headerLoginLink.innerHTML = `게스트 로그인 중`;
                writeButtonContainer.style.display = 'none';
            } else {
                headerLoginLink.innerHTML = `${user.displayName}님 <button id="logout-btn">로그아웃</button>`;
                writeButtonContainer.style.display = 'block';
                document.getElementById('logout-btn').addEventListener('click', () => {
                    signOut(auth);
                });
            }
        } else {
            headerLoginLink.innerHTML = '<a href="login.html">로그인</a>';
            writeButtonContainer.style.display = 'none';
        }
        fetchPosts();
    }

    onAuthStateChanged(auth, updateLoginUI);
}

initializePage();