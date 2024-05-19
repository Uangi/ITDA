import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './UserModal.css';
import { format } from 'date-fns';
import address from '../../API_KEY'

const MeetRequest = ({ selUser }) => {
  const [meetingDateTime, setMeetingDateTime] = useState(new Date());
  const [meetingPlace, setMeetingPlace] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [requestStatus, setRequestStatus] = useState('');

  useEffect(() => {
    fetchSessionId();
    fetchRequestStatus();
  }, [setRequestStatus]);
  

  const fetchSessionId = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/get_session_user_id`, {
        withCredentials: true 
      });
      setSessionId(response.data);
      console.log(sessionId);
      fetchRequestStatus();
    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  const fetchRequestStatus = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/req_meet/request_status`, {
        params: {
          recipientUserId: selUser.userId
        },
        withCredentials: true 
      });

        setRequestStatus(response.data.status);
      
    } catch (error) {
      console.error('Error fetching request status:', error);
    }
  };
  

  function formatDate(date) {
    return format(date, 'yyyy-MM-dd HH:mm');
  }

  const handleSendRequest = async () => {
    try {
      const formattedDate = formatDate(meetingDateTime);
      const formattedMeetingDate = formattedDate.split(' ')[0];
      const formattedMeetingTime = formattedDate.split(' ')[1];

      const response = await axios.post(`${address.backendaddress}/req_meet/send_request`, {
        senderUserId: sessionId,
        recipientUserId: selUser.userId,
        meetingDate: formattedMeetingDate,
        meetingTime: formattedMeetingTime,
        meetingPlace: meetingPlace,
      }, {
        headers: {
          'Authorization': `Bearer ${sessionId}`
        }
      });
      
      if (response.status === 200) {
        setResponseMessage("요청 대기 중");
      }
    } catch (error) {
      setResponseMessage("다이아 개수가 부족합니다. (최소 250개 필요)");
    }
  };

  return (
    <div>
      <div hidden={requestStatus === 'WAITING'}>
        <label htmlFor="meetingDateTime">만남 날짜 및 시간&nbsp;</label>
        <DatePicker
          selected={meetingDateTime}
          onChange={date => setMeetingDateTime(date)}
          showTimeSelect
          timeIntervals={30}
          timeFormat="HH:mm"
          dateFormat="yyyy-MM-dd HH:mm"
          minDate={new Date()}
        />
      </div>
      <div hidden={requestStatus === 'WAITING'}>
        <label htmlFor="meetingPlace">만남 장소&nbsp;</label>
        <input
          type="text"
          id="meetingPlace"
          value={meetingPlace}
          onChange={(e) => setMeetingPlace(e.target.value)}
        />
      </div>
      
      {requestStatus === 'WAITING' ? (<p>요청 대기 중</p>): (<div style={{color:'tomato',fontSize:14}}><br/>※ 요청 버튼을 누르면 신청자의 이름, 프로필 사진, 나이, 지역 정보가
      <br/>{selUser.userName} 님에게 전달됩니다</div>)}
      <button onClick={handleSendRequest} className='btn' hidden={requestStatus === 'WAITING'}>
        요청
      </button>
     
      <p>{responseMessage}</p>
    </div>
  );
};

export default MeetRequest;
