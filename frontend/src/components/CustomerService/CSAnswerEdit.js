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

  // const handleEditEmailChange = (e) => {
  //   setEditEmail(e.target.value);
  // };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (sessionId.trim() === 'admin') {
      try {
        // console.log('넘기는 이메일 : ' + answerDetail.userEmail);
        console.log('넘기는 내용:' + answerDetail.answerContent);
        console.log('넘기는 제목:' + answerDetail.answerSubject);
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
        {/* <input
          type="text"
          id="userEmail"
          placeholder={answerDetail.userEmail}
          onChange={handleEditEmailChange}
          value={editEmail}
        /> */}

        <input
          type="text"
          id="answerSubject"
          placeholder={answerDetail.answerSubject}
          onChange={handleChange}
          value={answerDetail.answerSubject}
        />

        {/* <input
          type="text"
          id="userNickname"
          placeholder={answerDetail.userNickname}
          onChange={handleChange}
          value={answerDetail.userNickname}
        /> */}
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
        <button>취소</button>
      </div>
    </div>
  );
};

export default CSAnswerEdit;
