import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import address from '../../API_KEY';

const CSAnswerEdit = () => {
  const { answerNo } = useParams();
  const [sessionId, setSessionId] = useState('');
  const [answerDetail, setAnswerDetail] = useState({
    answerNo: answerNo,
    userName: '',
    answerContent: '',
    answerSubject: '',
  });
  const history = useHistory();

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
          `http://localhost:4000/answerDetail?answerNo=${answerNo}`,{withCredentials:true}
        );
        setAnswerDetail(response.data);
      } catch (error) {
        console.error('Error data:', error);
      }
    };
    fetchData();
  }, [answerNo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAnswerDetail({
      ...answerDetail,
      [id]: value, boardWriteId: sessionId
    });
  };

  const handleCancel = () => {
    history.push(`/answerDetail/${answerNo}`); // 취소 버튼 클릭 시 해당 답변 상세 페이지로 이동
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (sessionId.trim() === 'admin') {
      try {
        setAnswerDetail({ ...answerDetail});
        const response = await axios.post(
          'http://localhost:4000/answerEdit',
          answerDetail, {withCredentials:true}
        );
        if (response.status === 200) {
          alert('답글 수정 완료');
          history.push(`/answerDetail/${answerNo}`);
        }
      } catch (error) {
        console.error('답변 수정 중 에러 발생:', error);
      }
    } else {
      alert('권한 정보가 다릅니다.');
    }
  };
  
  return (
    <div>
      AnswerEdit
      <div>
        답변 내용
        <input
          type="text"
          id="answerNo"
          value={answerDetail.answerNo || ''}
          readOnly
        />
      </div>
      <div>
        <input
          type="text"
          id="answerSubject"
          placeholder={answerDetail.answerSubject}
          onChange={handleChange}
          value={answerDetail.answerSubject}
        />
      </div>
      <div>
        <textarea
          id="answerContent"
          value={answerDetail.answerContent}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleAnswerSubmit}>수정</button>
        <button onClick={handleCancel}>취소</button> {/* 취소 버튼 클릭 시 handleCancel 함수 실행 */}
      </div>
    </div>
  );
};

export default CSAnswerEdit;
