import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'; // useHistory 추가
import address from '../../API_KEY';

const CSBoardEdit = () => {
  const { boardNo } = useParams();
  const [sessionId, setSessionId] = useState('');
  const [boardDetail, setBoardDetail] = useState({
    boardNo: boardNo,
    boardContent: '',
    boardSubject: '',
  });
  const history = useHistory(); // useHistory 사용

  const fetchSessionId = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/get_session_user_id`, {
        withCredentials: true 
      });
      setSessionId(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  useEffect(() => {
    fetchSessionId();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/boardDetail?boardNo=${boardNo}`, {withCredentials:true}
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
    setBoardDetail({
      ...boardDetail,
      [id]: value, boardWriteId: sessionId 
    });
  };

  const handleBoardEdit = async (e) => {
    e.preventDefault();
    if (boardDetail.boardWriteId === sessionId) {
      try {
        console.log('넘기는 내용:' + boardDetail.boardContent);
        console.log('넘기는 제목:' + boardDetail.boardSubject);
        setBoardDetail({ ...boardDetail});
        const response = await axios.post(
          `http://localhost:4000/board/edit`,
          boardDetail,{withCredentials:true}
        );
        if (response.status === 200) {
          alert('글 수정 완료');
          history.push(`/boardDetail/${boardNo}`); // 리다이렉트 수행
        }
      } catch (error) {
        console.error('데이터 넘기다가 에러 발생:', error);
      }
    } else {
      alert('사용자 정보가 다릅니다.');
    }
  };

  return (
    <div>
      <h2>BoardEdit</h2>
      <div>
        유저가 남긴 글 번호 No.{boardDetail.boardNo}

      </div>
      <div>

        <input
          type="text"
          id="boardSubject"
          onChange={handleChange}
          placeholder={boardDetail.boardSubject}
          value={boardDetail.boardSubject}
        />
      </div>
      <div>
        <textarea
          id="boardContent"
          value={boardDetail.boardContent}
          onChange={handleChange}
          placeholder={boardDetail.boardContent}
        />
      </div>
      <div>
        <button onClick={handleBoardEdit}>등록</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default CSBoardEdit;
