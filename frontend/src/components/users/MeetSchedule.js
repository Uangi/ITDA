import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './UserModal.css';
import { format } from 'date-fns';
import address from '../../API_KEY'

const formatMeetingDateTime = (date) => {
  const formattedDate = format(new Date(date), 'yyyy년 MM월 dd일');
  return `${formattedDate}`;
};

const MeetSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    fetchSessionId();
    fetchMeetings();
  }, [setSchedule]);

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

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/req_meet/requests`, {
        withCredentials: true
      });
      const meetSchedule = response.data.filter(meeting => meeting.status === 'ACCEPTED');
      setSchedule(meetSchedule);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  return (
    <div>
      <h1 style={{textAlign:'center', marginTop:'20px'}}>예정된 만남 일정을 확인해보세요.</h1>
      <div className="schedule-table">
        <div className="schedule-header">
          <span></span>
          <span>신청자</span>
          <span></span>
          <span>일정</span>
          <span></span>
          <span>장소</span>
        </div>
        <div className="schedule-body">
          {schedule.map(meeting => {
            if (sessionId === meeting.sender.userId || sessionId === meeting.recipient.userId)
            {
              return (
                <div key={meeting.no} className="schedule-row">
                  <img style={{marginLeft:200}}className="profile-img" src={'./profile/' + meeting.sender.userProfile} alt="Profile" />
                  <span>{meeting.sender.userName}</span>
                  <span style={{marginLeft:95}}>{formatMeetingDateTime(meeting.meetingDate)}  {meeting.meetingTime}</span>
                  <span style={{marginLeft:100}}>{meeting.meetingPlace}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default MeetSchedule;
