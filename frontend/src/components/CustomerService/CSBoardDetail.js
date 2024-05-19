import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import address from '../../API_KEY';

const CSBoardDetail = () => {

  const { boardNo } = useParams();
  const [boardDetail, setBoardDetail] = useState([]);
  const [sessionId, setSessionId] = useState('');
  
  console.log('boardNo : ', boardNo);
  console.log('11:' + boardDetail.boardWriteId)
  console.log('22:' + sessionId)
  console.log((boardDetail.boardWriteId == sessionId))

  useEffect(() => {
    fetchSessionId();
    axios
      .get(`${address.backendaddress}/boardDetail?boardNo=${boardNo}`, {withCredentials:true})
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
    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  const handleAnswerWrite = () => {
    

    if (sessionId == 'admin') { // 세션 아이디가 admin일 때만 동작하도록 수정
      window.location.href = `/answerWrite/${boardNo}`;
    } else {
      alert('관리자 권한이 필요합니다.'); // 관리자 권한이 없는 경우 알림
    }
  };

  const handleAnswerEdit = () => {
    if (boardDetail.boardWriteId == sessionId) {
      window.location.href = `/boardEdit/${boardNo}`;
    } else {
      alert('수정 권한은 작성자에게만 있습니다.');
    }
  };

  return (
    
    <div >
      <h2 style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' ,border: '2px solid ',color:'red',marginBottom:'60px' ,justifyContent:'center'}}>BoardDetail</h2>
      <div style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' ,border: '2px solid ',color:'red',marginBottom:'30px'}}>
      <div>NO.   {boardDetail.boardNo}</div>
      <div>ID.   {boardDetail.userId}</div>
      <div>Title.   {boardDetail.boardSubject}</div>
      <div>Date.   {boardDetail.createdAt}</div>
      <div>문의내용   {boardDetail.boardContent}</div></div>
      <div style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' ,marginBottom:'60px' ,justifyContent:'center'}}>
        <button  className='csboard_button' onClick={handleAnswerEdit} style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' ,border: '2px solid ',color:'red'}}>
          수정하기
        </button>
        <button className='csboard_button' onClick={handleAnswerWrite} style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' ,border: '2px solid ',color:'red',marginBottom:'60px'}}>
          답글달기
          
        </button>

      </div>
    </div>
  );
};

export default CSBoardDetail;
