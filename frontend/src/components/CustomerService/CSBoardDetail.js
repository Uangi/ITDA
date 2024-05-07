import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import address from '../../API_KEY';

const CSBoardDetail = () => {

  const { boardNo } = useParams();
  const [boardDetail, setBoardDetail] = useState([]);
  const [sessionId, setSessionId] = useState('');
  
  console.log('boardNo : ', boardNo);

  useEffect(() => {
    fetchSessionId();
    axios
      .get(`http://localhost:4000/boardDetail?boardNo=${boardNo}`, {withCredentials:true})
      .then((response) => {
        console.log(response.data);
        setBoardDetail(response.data);
      })
      .catch((error) => {
        console.error('error detail', error);
      });
  }, [boardNo]);

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

  const handleAnswerWrite = () => {
    if (sessionId.trim() === 'admin') { // 세션 아이디가 admin일 때만 동작하도록 수정
      window.location.href = `/answerWrite/${boardNo}`;
    } else {
      alert('관리자 권한이 필요합니다.'); // 관리자 권한이 없는 경우 알림
    }
  };

  const handleAnswerEdit = () => {
    if (boardDetail.boardWriteId === sessionId) {
      window.location.href = `/boardEdit/${boardNo}`;
    } else {
      alert('수정 권한은 작성자에게만 있습니다.');
    }
  };
// const formattedDate = boardDetail.createdAt.replace("T", " ").replace(/:\d+\.\d+$/, "");

  return (
    
    <div>
      <h2>BoardDetail</h2>
      <div>글번호 : {boardDetail.boardNo}</div>
      <div>아이디 : {boardDetail.userId}</div>
      <div>제목 : {boardDetail.boardSubject}</div>
      <div>작성일 : {boardDetail.createdAt}</div>
      <div>내용 : {boardDetail.boardContent}</div>
      <div>
        <button onClick={handleAnswerEdit}>
          수정하기
        </button>
        <button onClick={handleAnswerWrite}>
          답글달기
          
        </button>

      </div>
    </div>
  );
};

export default CSBoardDetail;
