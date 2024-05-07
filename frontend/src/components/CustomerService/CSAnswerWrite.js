import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import address from '../../API_KEY'

const CSAnswerWrite = () => {
  const [sessionId, setSessionId] = useState('');
  const { boardNo } = useParams();
  const [boardDetail, setBoardDetail] = useState({
    boardContent: '',
    boardSubject: '',
    boardWriteId: ''
  });

  const [answer, setAnswer] = useState({
    answerContent: '',
    answerSubject: '',
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/boardDetail?boardNo=${boardNo}`,{withCredentials:true}
        );
        setBoardDetail(response.data);
      } catch (error) {
        console.error('Error data:', error);
      }
    };

    fetchData();
  }, [boardNo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAnswer({ ...answer, [id]: value, boardWriteId : sessionId });
  };

  const handleAnswerWrite = (e) => {
    e.preventDefault();
    // if (
    //   answer.userEmail.trim() === 'admin' &&
    //   answer.userNickname.trim() === 'admin'
    // ) {
    // } else {
    //   alert('관리자 권한이 필요합니다.');
    // }
    handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit 실행');

    try {
      const ok = await axios.post(`http://localhost:4000/answer/write`, {
        ...answer,
        boardNo,
      });
      if (ok.status === 200) {
        alert('답글 등록완료');
        // 등록이 완료되면 '/boardList' 경로로 이동
        window.location.href = '/boardList';
      }
    } catch (error) {
      console.log('데이터 넘기다가 에러 발생' + error);
    }
  };

  return (
    <div>
      AnswerWrite
      <div>
        유저가 남긴 글 번호
        <input
          type="text"
          id="boardNo"
          value={boardDetail.boardNo || ''}
          readOnly
        />
        유저가 남긴 글 내용
        <input
          type="text"
          id="boardContent"
          value={boardDetail.boardContent || ''}
          readOnly
        />
      </div>
      <div>
        <input
          type="text"
          id="answerSubject"
          value={answer.answerSubject || ''}
          onChange={handleChange}
          placeholder="제목을 입력하셈"
        />
      </div>
      <div>
        <textarea
          id="answerContent"
          value={answer.answerContent || ''}
          onChange={handleChange}
          placeholder="글 내용쓰셈"
        />
      </div>
      <div>
        <button onClick={handleAnswerWrite}>등록</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default CSAnswerWrite;
