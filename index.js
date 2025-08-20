import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, query, orderBy, startAt, endAt, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const postList = document.querySelector('.post-list');
const writeBtn = document.getElementById('write-btn');
const headerLoginLink = document.querySelector('header a[href="login.html"]');
const writeButtonContainer = document.querySelector('.main-actions');
const searchForm = document.querySelector('.search-box form');
const searchInput = document.querySelector('.search');

async function fetchPosts() {
  postList.innerHTML = '';
  const currentUser = auth.currentUser;

  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((docSnap) => {
    const post = docSnap.data();
    const postId = docSnap.id;
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

  querySnapshot.forEach((docSnap) => {
    const post = docSnap.data();
    const postId = docSnap.id;
    const listItem = document.createElement('li');
    listItem.className = 'post-item';
    listItem.innerHTML = `
      <a href="detail.html?id=${postId}" class="post-title-link">${post.title}</a>
      <div class="post-meta">
        <span class="author">작성자: ${post.author}</span>
      </div>
    `;
    postList.appendChild(listItem);
  });
}

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

  postList.addEventListener('click', (event) => {
    if (event.target.classList.contains('post-title-link')) {
      const postId = event.target.dataset.postId;
      window.location.href = `detail.html?id=${postId}`;
    }
  });

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const keyword = searchInput.value.trim();
    if (keyword) {
      await searchPosts(keyword);
    } else {
      await fetchPosts();
    }
  });

  function updateLoginUI(user) {
  if (user) {
    if (user.isAnonymous) {
      headerLoginLink.innerHTML = `게스트 로그인 중`;
      writeButtonContainer.style.display = 'none'; // 글쓰기 버튼 숨김
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
