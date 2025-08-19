// detail.js (새 파일)

// 1. 필요한 도구들을 가져옵니다.
import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// 2. URL 주소창을 분석해서 'id' 값을 찾아냅니다. (예: detail.html?id=ABCDEFG)
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// 3. postId를 이용해 특정 글 하나의 데이터를 가져오는 함수
async function fetchPost(id) {
    if (!id) {
        // 만약 ID가 없으면 에러 처리
        document.getElementById('post-detail-title').textContent = "게시글을 찾을 수 없습니다.";
        return;
    }

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const post = docSnap.data();
        
        // 가져온 데이터로 HTML의 각 부분에 내용을 채워넣습니다.
        document.getElementById('post-detail-title').textContent = post.title;
        document.getElementById('post-detail-author').textContent = `작성자: ${post.author}`;
        const date = post.createdAt.toDate();
        const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        document.getElementById('post-detail-date').textContent = `작성일: ${formattedDate}`;
        document.getElementById('post-detail-text').innerHTML = post.content.replace(/\n/g, '<br>');

    } else {
        document.getElementById('post-detail-title').textContent = "삭제되었거나 존재하지 않는 게시글입니다.";
    }
}

// 4. 페이지가 로드되면, URL에서 찾아낸 postId로 fetchPost 함수를 실행합니다.
fetchPost(postId);