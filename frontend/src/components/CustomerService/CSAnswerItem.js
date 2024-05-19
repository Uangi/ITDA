import React from 'react';
import { Link } from 'react-router-dom';
import { PiArrowElbowDownRightThin } from "react-icons/pi";

function CSAnswerItem({ answerItem }) {
  const {
    boardNo,
    userEmail,
    answerNo,
    userNickname,
    answerSubject,
    createdAt,
    answerContent,
  } = answerItem;

  function formatKoreanDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDateTime = `${year}. ${month}. ${day} / ${hours} : ${minutes} `;
    return formattedDateTime;
  }

  const formattedDateTime = formatKoreanDateTime(createdAt);

  const handleLinkClick = () => {
    window.location.href = `/answerDetail/${answerNo}`; // 클릭 시 이동할 URL 설정
  };

  return (
  <>
    <div style={{width:'20%'}}><PiArrowElbowDownRightThin /></div>
    <div style={{width:'60%', cursor: 'pointer', textDecoration: 'underline' }} onClick={handleLinkClick}>{answerSubject}</div>
    <div style={{width:'20%'}}>관리자</div>
    <div style={{width:'20%'}}>{formattedDateTime}</div>
  </>
  );
}

export default CSAnswerItem;
