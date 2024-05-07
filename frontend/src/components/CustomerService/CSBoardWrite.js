import axios from 'axios';
import React, { useEffect, useState } from 'react';
import address from '../../API_KEY'


const CSBoardWrite = () => {
  const [sessionId, setSessionId] = useState('');
  const [board, setBoard] = useState({
    boardContent: '',
    boardSubject: '',
    boardWriteId: '' // 초기값을 비워둠
  });

  useEffect(() => {
    fetchSessionId();
  }, []);

  const fetchSessionId = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/get_session_user_id`, {
        withCredentials: true 
      });
      setSessionId(response.data);
      console.log('세션 아이디 : ',response.data);
    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBoard({ ...board, [id]: value, boardWriteId: sessionId }); // sessionId 사용
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit 실행');

    try {
      const ok = await axios.post('http://localhost:4000/board/write', board, { withCredentials: true });

      if (ok) {
        alert('게시판 등록완료');
        window.location.href = '/boardList';
      }
    } catch (error) {
      console.log('데이터 넘기다가 에러 발생' + error);
    }
  };

  return (
    <div>
      BoardWrite
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="boardSubject"
            value={board.boardSubject}
            onChange={handleChange}
            placeholder="제목을 입력하셈"
          />
        </div>
        <div>
          <textarea
            id="boardContent"
            value={board.boardContent}
            onChange={handleChange}
            placeholder="글 내용쓰셈"
          />
        </div>
        <div>
          <button type="submit">등록</button>
          <button>취소</button>
        </div>
      </form>
    </div>
  );
};


export default CSBoardWrite;
