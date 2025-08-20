import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, getDocs, query, orderBy, startAt, endAt } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const headerLoginLink = document.querySelector('header a[href="login.html"]');
const writeButtonContainer = document.getElementById('write-button-container');
const postList = document.getElementById('post-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

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
    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        const keyword = searchInput.value.trim();
        if (keyword) {
            searchPosts(keyword);
        } else {
            fetchPosts();
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const keyword = searchInput.value.trim();
            if (keyword) {
                searchPosts(keyword);
            } else {
                fetchPosts();
            }
        }
    });

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