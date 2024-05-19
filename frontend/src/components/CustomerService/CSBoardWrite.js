import axios from 'axios';
import React, { useEffect, useState } from 'react';
import address from '../../API_KEY'
import { useHistory } from 'react-router-dom';
import QnaHeader from '../image/QnaHeader.png';


const CSBoardWrite = () => {
  const history = useHistory();
  const [sessionId, setSessionId] = useState('');
  const [userId, setUserId] = useState('');
  const [board, setBoard] = useState({
    userId:'',
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
      setUserId(userId);
      console.log('유저 아이디 : ',userId);
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
      const ok = await axios.post(`${address.backendaddress}/board/write`, board, { withCredentials: true });

      if (ok) {
        alert('게시판 등록완료');
        history.push('/boardList'); // 등록 완료 후 boardList로 이동
      }
    } catch (error) {
      console.log('데이터 넘기다가 에러 발생' + error);
    }
  };

  const handleCancel = () => {
    history.push('/boardList'); // 취소 버튼 클릭 시 boardList로 이동
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' ,border: '2px solid ',color:'red',marginBottom:'60px'}}>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img style={{ height: '300px' }} src={QnaHeader} alt="Qna Header" />
  </div>
      <form onSubmit={handleSubmit}>
        {/* 임시 히든 */}
      <input
            type="hidden"
            id="userId"
            value={board.userId}
          />

        <div>
          <input style={{border: '2px solid ',color:'#575757' ,margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' ,backgroundColor:'transparent'}}
            type="text"
            id="boardSubject"
            value={board.boardSubject}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>
        <div>
          <input style={{width:'500px',height:'300px',border: '2px solid ',color:'#575757' ,margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' ,backgroundColor:'transparent'}}
          type="text"
            id="boardContent"
            value={board.boardContent}
            onChange={handleChange}
            placeholder=" 주의 : 부적절한 문의나 욕설, 비방글 등은 삭제될 수 있습니다."
          />
        </div>
        <div>
          <button type="submit" style={{border: '2px solid red',color:'red' ,margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' ,backgroundColor:'transparent'}}>등록</button>
          <button type="button" style={{border: '2px solid red',color:'red' ,margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' ,backgroundColor:'transparent'}} onClick={handleCancel}>취소</button>
        </div>
        <div style={{marginBottom:'50px'}}>

        </div>
      </form>
    </div>
  );
};

export default CSBoardWrite;
