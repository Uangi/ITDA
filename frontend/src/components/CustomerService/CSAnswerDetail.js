import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import address from '../../API_KEY';

const CSAnswerDetail = () => {

  const { answerNo } = useParams();
  const [answerDetail, setAnswerDetail] = useState([]);
  // const [adminEmail, setAdminEmail] = useState('');
  const [sessionId, setSessionId] = useState('');

  console.log('answerNo : ', answerNo);

  useEffect(() => {
    fetchSessionId();
    axios
      .get(`${address.backendaddress}/answerDetail?answerNo=${answerNo}`, {withCredentials:true})
      .then((response) => {
        console.log(response.data);
        setAnswerDetail(response.data);
      })
      .catch((error) => {
        console.error('error detail', error);
      });
  }, [answerNo]);

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
    if (sessionId == 'admin') {
      window.location.href = `/answerEdit/${answerNo}`;
    } else {
      alert('수정 권한은 관리자에게만 있습니다.'); // 관리자 권한이 없는 경우 알림
    }
  };

  return (
    <div>
      <h2>AnswerDetail</h2>
      <div>아이디: {answerDetail.userId}</div>
      <div>답글번호 : {answerDetail.answerNo}</div>
      <div>제목 : {answerDetail.answerSubject}</div>
      <div>작성일 : {answerDetail.createdAt}</div>
      <div>내용 : {answerDetail.answerContent}</div>
      <div>
        <button onClick={handleAnswerWrite}>
          수정하기
          {sessionId == 'admin' && (
            <Link to={`/answerEdit/${answerNo}`}></Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default CSAnswerDetail;
