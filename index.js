
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, query, orderBy, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const postList = document.querySelector('.post-list');
const writeBtn = document.getElementById('write-btn');
const headerLoginLink = document.querySelector('header a[href="login.html"]');
const writeButtonContainer = document.querySelector('.main-actions');

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

function updateLoginUI(user) {
    if (user) {
        headerLoginLink.innerHTML = `${user.displayName}님 <button id="logout-btn">로그아웃</button>`;
        writeButtonContainer.style.display = 'block'; // 
        document.getElementById('logout-btn').addEventListener('click', () => {
            signOut(auth);
        });
    } else {
        headerLoginLink.innerHTML = '<a href="login.html">로그인</a>';
        writeButtonContainer.style.display = 'none'; 
    }
    fetchPosts();
}

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


function initializePage() {
    writeBtn.addEventListener('click', () => {
        window.location.href = "write.html";
    });

    onAuthStateChanged(auth, updateLoginUI);
}

initializePage();